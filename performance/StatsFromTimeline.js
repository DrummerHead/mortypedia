class StatsFromTimeline {
  constructor({timelineRawData, eventName}){
    this.timelineRawData = timelineRawData;
    this.eventName = eventName;
  }

  filterByEventName() {
    return this.timelineRawData.filter(obj => obj.name === this.eventName);
  }

  /*
   * Assumes that there's always a 'b' ph (event type) before a 'e' event type
   * https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview#heading=h.yr4qxyxotyw
   *
   * it's a hell of an assumption.
   *
  */
  getStartEndTuples() {
    return this.filterByEventName().reduce((acc, curr) => {
      if (curr.ph === 'b') {
        acc.push([curr]);
      } else if (curr.ph === 'e') {
        acc[acc.length - 1].push(curr);
      } else {
        throw new Error('curr is not b nor e')
      }
      return acc;
    }, []);
  }

  getDurationOfEvent() {
    return this.getStartEndTuples().map((tuple) =>
      tuple[1].ts - tuple[0].ts
    );
  }

  getStats() {
    const durationOfEvents = this.getDurationOfEvent();
    return {
      eventsDuration: durationOfEvents,
      averageDuration: durationOfEvents.reduce((acc, curr) => acc + curr) / durationOfEvents.length,
      maxDuration: Math.max(...durationOfEvents),
      minDuration: Math.min(...durationOfEvents),
    };
  }

  printStats() {
    const stats = this.getStats();
    console.log(`
Information about React component action "${this.eventName}" performance (in miliseconds):
Average time: ${stats.averageDuration}
Max time: ${stats.maxDuration}
Min Time: ${stats.minDuration}

    `)
  }
}

module.exports = StatsFromTimeline;
