#!/usr/bin/env node

const StatsFromTimeline = require('./StatsFromTimeline');

const before01 = require('./before-01-TimelineRawData-20170420T163006.json')
const before02 = require('./before-02-TimelineRawData-20170421T162317.json');

const mortyRowMountStats = new StatsFromTimeline({
  timelineRawData: before01,
  eventName: 'MortyRow [mount]'
});

const mortyRowMountStats02 = new StatsFromTimeline({
  timelineRawData: before02,
  eventName: 'MortyRow [mount]'
});

mortyRowMountStats.printStats();

mortyRowMountStats02.printStats();
