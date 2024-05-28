/******************************* 
 * Odd_One_Out_Experiment Test *
 *******************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2022.2.5.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'odd_one_out_experiment';  // from the Builder filename that created this script
let expInfo = {
    'participant': '000',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from global_code
// Initialize counter
let counter = 0;
// Set number of trials per loop. Change as you wish
// These are used in the code blocks of each loop
let nPractice = 2;
let nMain = 2;
// Creates text definition for subset 
// to be used in main trials loop.
let subset_text = (nPractice.toString() + ":-1");
// Starts timer to keep track of elapsed time
let global_timer = new util.Clock();
let ref_time = global_timer.getTime();
// function to add trial information

var index_count;
function addTrialInfo(trial_type, event, rt, time_elapsed, index_count) {
  // Add data to the experiment handler
  psychoJS.experiment.addData('trial_type', trial_type);
  psychoJS.experiment.addData('trial_index', index_count);
  psychoJS.experiment.addData('event', event);
  psychoJS.experiment.addData('rt', rt*1000); // Expects seconds, converts to ms
  psychoJS.experiment.addData('time_elapsed', time_elapsed*1000); // Same
  
  // Update counter
  index_count = index_count + 1;
  
  return index_count;
}
// Function to check if the mouse is hovering over a stimulus 

var mousePos;
var mousePosX;
var mousePosY;
var mouseWithinX;
var mouseWithinY;
var stimPos;
var stimHalfSizeX;
var stimHalfSizeY;
var stimLBound;
var stimRBound;
var stimLoBound;
var stimHiBound;
function mouseOnStim(stim, mouse) {
    var mousePos, mousePosX, mousePosY, mouseWithinX, mouseWithinY, stimHalfSizeX, stimHalfSizeY, stimHiBound, stimLBound, stimLoBound, stimPos, stimRBound;
    mousePos = mouse.getPos();
    mousePosX = mousePos[0];
    mousePosY = mousePos[1];
    mouseWithinX = false;
    mouseWithinY = false;
    stimPos = stim.pos;
    stimHalfSizeX = (stim.size[0] / 2);
    stimHalfSizeY = (stim.size[1] / 2);
    stimLBound = (stimPos[0] - stimHalfSizeX);
    stimRBound = (stimPos[0] + stimHalfSizeX);
    stimLoBound = (stimPos[1] - stimHalfSizeY);
    stimHiBound = (stimPos[1] + stimHalfSizeY);
    if (((mousePosX > stimLBound) && (mousePosX < stimRBound))) {
        mouseWithinX = true;
    } else {
        mouseWithinX = false;
    }
    if (((mousePosY > stimLoBound) && (mousePosY < stimHiBound))) {
        mouseWithinY = true;
    } else {
        mouseWithinY = false;
    }
    return (mouseWithinX && mouseWithinY);
}
// Takes in mouse object and logs response for clickable trials

var mouse_rt;
var response;
var stimulus;
var file_name;
var trial_index;
function logClickResponse(mouseObject, trial_type, trial_num, time_elapsed, trial_index) {
    var file_name, mouse_rt, response, stimulus;
    mouse_rt = mouseObject.time[0];
    response = mouseObject.clicked_name[0];
    stimulus = [Stim1, Stim2, Stim3];
    if (response.includes("stim1")) {
        response = 1;
        file_name = Stim1;
    } else {
        if (response.includes("stim2")) {
            response = 2;
            file_name = Stim2;
        } else {
            response = 3;
            file_name = Stim3;
        }
    }
    psychoJS.experiment.addData("trial_type", trial_type);
    psychoJS.experiment.addData("trial_index", trial_index);
    psychoJS.experiment.addData("event", "click_response");
    psychoJS.experiment.addData("time_elapsed", time_elapsed*1000);
    psychoJS.experiment.addData("stimulus", stimulus);
    psychoJS.experiment.addData("response", response);
    psychoJS.experiment.addData("filename", file_name);
    psychoJS.experiment.addData("trial_number", trial_num);
    psychoJS.experiment.addData("rt", mouse_rt*1000);
    trial_index = (trial_index + 1);
    return trial_index;
}

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(startRoutineBegin());
flowScheduler.add(startRoutineEachFrame());
flowScheduler.add(startRoutineEnd());
flowScheduler.add(ICRoutineBegin());
flowScheduler.add(ICRoutineEachFrame());
flowScheduler.add(ICRoutineEnd());
flowScheduler.add(welcomeRoutineBegin());
flowScheduler.add(welcomeRoutineEachFrame());
flowScheduler.add(welcomeRoutineEnd());
flowScheduler.add(exampleRoutineBegin());
flowScheduler.add(exampleRoutineEachFrame());
flowScheduler.add(exampleRoutineEnd());
const practiceTrialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(practiceTrialsLoopBegin(practiceTrialsLoopScheduler));
flowScheduler.add(practiceTrialsLoopScheduler);
flowScheduler.add(practiceTrialsLoopEnd);
flowScheduler.add(pauseRoutineBegin());
flowScheduler.add(pauseRoutineEachFrame());
flowScheduler.add(pauseRoutineEnd());
const mainTrialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(mainTrialsLoopBegin(mainTrialsLoopScheduler));
flowScheduler.add(mainTrialsLoopScheduler);
flowScheduler.add(mainTrialsLoopEnd);
flowScheduler.add(exitRoutineBegin());
flowScheduler.add(exitRoutineEachFrame());
flowScheduler.add(exitRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'stimuli/C3_Images_Replacement3.png', 'path': 'stimuli/C3_Images_Replacement3.png'},
    {'name': 'stimuli/NC4_Images_IvanchukSavchenko(Nomate)(Reversed).png', 'path': 'stimuli/NC4_Images_IvanchukSavchenko(Nomate)(Reversed).png'},
    {'name': 'stimuli/C1_Images_SteinitzNN.png', 'path': 'stimuli/C1_Images_SteinitzNN.png'},
    {'name': 'stimuli/NC3_Images_StudybyErcoleDelRio(Nomate)(Reversed).png', 'path': 'stimuli/NC3_Images_StudybyErcoleDelRio(Nomate)(Reversed).png'},
    {'name': 'informed_consent/informed_consent.png', 'path': 'informed_consent/informed_consent.png'},
    {'name': 'stimuli/C2_Images_KekhayovPetrov(Reversed).png', 'path': 'stimuli/C2_Images_KekhayovPetrov(Reversed).png'},
    {'name': 'stimuli/NC5_Images_EasyPosition2(Nomate).png', 'path': 'stimuli/NC5_Images_EasyPosition2(Nomate).png'},
    {'name': 'stimuli/C4_Images_BrankaWittwer(Reversed).png', 'path': 'stimuli/C4_Images_BrankaWittwer(Reversed).png'},
    {'name': 'datasets/triplets.csv', 'path': 'datasets/triplets.csv'},
    {'name': 'stimuli/NC3_Images_Replacement3(Nomate).png', 'path': 'stimuli/NC3_Images_Replacement3(Nomate).png'},
    {'name': 'stimuli/NC1_Images_Frombeautiful(Nomate).png', 'path': 'stimuli/NC1_Images_Frombeautiful(Nomate).png'},
    {'name': 'stimuli/C3_Images_PodzerovKuntzevic(Reversed).png', 'path': 'stimuli/C3_Images_PodzerovKuntzevic(Reversed).png'},
    {'name': 'stimuli/C2_Images_KrauseMeinhardt.png', 'path': 'stimuli/C2_Images_KrauseMeinhardt.png'},
    {'name': 'stimuli/C1_Images_WinterFriede(Reversed).png', 'path': 'stimuli/C1_Images_WinterFriede(Reversed).png'},
    {'name': 'stimuli/C5_Images_EasyPosition5(Reversed).png', 'path': 'stimuli/C5_Images_EasyPosition5(Reversed).png'},
    {'name': 'stimuli/NC2_Images_SkujaRozenbergs(Nomate)(Reversed).png', 'path': 'stimuli/NC2_Images_SkujaRozenbergs(Nomate)(Reversed).png'},
    {'name': 'stimuli/NC3_Images_KazicVukovic(Nomate)(Reversed).png', 'path': 'stimuli/NC3_Images_KazicVukovic(Nomate)(Reversed).png'},
    {'name': 'stimuli/C3_Images_Replacement5.png', 'path': 'stimuli/C3_Images_Replacement5.png'},
    {'name': 'stimuli/C4_Images_StrekalovskyShaposhlikov.png', 'path': 'stimuli/C4_Images_StrekalovskyShaposhlikov.png'},
    {'name': 'stimuli/C3_Images_MalininAndreev(Reversed).png', 'path': 'stimuli/C3_Images_MalininAndreev(Reversed).png'},
    {'name': 'stimuli/C5_Images_EasyPosition2.png', 'path': 'stimuli/C5_Images_EasyPosition2.png'},
    {'name': 'stimuli/NC2_Images_Replacement4(Nomate).png', 'path': 'stimuli/NC2_Images_Replacement4(Nomate).png'},
    {'name': 'stimuli/C4_Images_IvanchukSavchenko(Reversed).png', 'path': 'stimuli/C4_Images_IvanchukSavchenko(Reversed).png'},
    {'name': 'stimuli/NC3_Images_MalininAndreev(Nomate)(Reversed).png', 'path': 'stimuli/NC3_Images_MalininAndreev(Nomate)(Reversed).png'},
    {'name': 'stimuli/NC3_Images_PodzerovKuntzevic(Nomate)(Reversed).png', 'path': 'stimuli/NC3_Images_PodzerovKuntzevic(Nomate)(Reversed).png'},
    {'name': 'stimuli/NC3_Images_TylorWinter(Nomate).png', 'path': 'stimuli/NC3_Images_TylorWinter(Nomate).png'},
    {'name': 'stimuli/NC2_Images_KrauseMeinhardt(Nomate).png', 'path': 'stimuli/NC2_Images_KrauseMeinhardt(Nomate).png'},
    {'name': 'stimuli/C2_Images_SkujaRozenbergs(Reversed).png', 'path': 'stimuli/C2_Images_SkujaRozenbergs(Reversed).png'},
    {'name': 'stimuli/NC1_Images_WinterFriede(Nomate)(Reversed).png', 'path': 'stimuli/NC1_Images_WinterFriede(Nomate)(Reversed).png'},
    {'name': 'stimuli/NC5_Images_EasyPosition6(Nomate).png', 'path': 'stimuli/NC5_Images_EasyPosition6(Nomate).png'},
    {'name': 'stimuli/NC3_Images_Replacement5(Nomate).png', 'path': 'stimuli/NC3_Images_Replacement5(Nomate).png'},
    {'name': 'stimuli/C1_Images_Frombeautiful.png', 'path': 'stimuli/C1_Images_Frombeautiful.png'},
    {'name': 'stimuli/C2_Images_Replacement4.png', 'path': 'stimuli/C2_Images_Replacement4.png'},
    {'name': 'stimuli/C5_Images_EasyPosition6.png', 'path': 'stimuli/C5_Images_EasyPosition6.png'},
    {'name': 'stimuli/NC1_Images_SteinitzNN(Nomate).png', 'path': 'stimuli/NC1_Images_SteinitzNN(Nomate).png'},
    {'name': 'stimuli/NC4_Images_StrekalovskyShaposhlikov(Nomate).png', 'path': 'stimuli/NC4_Images_StrekalovskyShaposhlikov(Nomate).png'},
    {'name': 'stimuli/C3_Images_TylorWinter.png', 'path': 'stimuli/C3_Images_TylorWinter.png'},
    {'name': 'stimuli/NC2_Images_KekhayovPetrov(Nomate)(Reversed).png', 'path': 'stimuli/NC2_Images_KekhayovPetrov(Nomate)(Reversed).png'},
    {'name': 'stimuli/C3_Images_KazicVukovic(Reversed).png', 'path': 'stimuli/C3_Images_KazicVukovic(Reversed).png'},
    {'name': 'stimuli/C3_Images_StudybyErcoledelRio(Reversed).png', 'path': 'stimuli/C3_Images_StudybyErcoledelRio(Reversed).png'},
    {'name': 'stimuli/NC4_Images_BrankaWittwer(Nomate)(Reversed).png', 'path': 'stimuli/NC4_Images_BrankaWittwer(Nomate)(Reversed).png'},
    {'name': 'instructions/example_trial.png', 'path': 'instructions/example_trial.png'},
    {'name': 'stimuli/NC5_Images_EasyPosition5(Nomate)(Reversed).png', 'path': 'stimuli/NC5_Images_EasyPosition5(Nomate)(Reversed).png'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2022.2.5';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + ((("data/" + "sub_") + expInfo["participant"]) + `/sub${expInfo["participant"]}_${expName}_${expInfo["date"]}`));


  return Scheduler.Event.NEXT;
}


var startClock;
var ICClock;
var IC_img;
var key_IC;
var welcomeClock;
var welcome_text;
var key_welcome;
var exampleClock;
var example_trial;
var example_text;
var key_example;
var practiceClock;
var fixation_practice;
var frame1_pract;
var frame2_pract;
var frame3_pract;
var stim1_pract;
var stim2_pract;
var stim3_pract;
var mouse_pract;
var question_text_pract;
var pauseClock;
var pause_text;
var key_pause;
var main_expClock;
var fixation_main;
var frame1_main;
var frame2_main;
var frame3_main;
var stim1_main;
var stim2_main;
var stim3_main;
var mouse_main;
var question_text_main;
var exitClock;
var exit_text;
var key_exit;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "start"
  startClock = new util.Clock();
  // Run 'Begin Experiment' code from global_code
  // Fill in variables to log
  let current_trial_type = "start experiment";
  let current_event = "loading";
  let current_rt = "";
  // Get current elapsed time
  let current_time_elapsed = (global_timer.getTime()-ref_time);
  
  // Store info in trial_info and return updated counter
  counter = addTrialInfo(current_trial_type, 
      current_event, 
      current_rt,
      current_time_elapsed,
      counter
      );
  
  // Add other columns but leave empty for now
  psychoJS.experiment.addData('stimulus', "")
  psychoJS.experiment.addData('response', "")
  psychoJS.experiment.addData('file_name',"")
  psychoJS.experiment.addData('trial_number',"")
  // Initialize components for Routine "IC"
  ICClock = new util.Clock();
  IC_img = new visual.ImageStim({
    win : psychoJS.window,
    name : 'IC_img', units : undefined, 
    image : 'informed_consent/informed_consent.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.8, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  key_IC = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "welcome"
  welcomeClock = new util.Clock();
  welcome_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'welcome_text',
    text: "Welcome, in this experiment you will be presented with three chess scenario's, side-by-side.\n\nIt is your task to select the odd-one-out. In other words, choose the one you think is the most different when comparing to the other two scenario's.\n\nTo select the odd-one-out you can use your mouse. Click on the scenario you think is the most distinct. There is no time limit.\n\nWe will begin by presenting an example of a single trial. For this example there is no need to concentrate on whether the decision is correct; instead, make yourself familiar with the overal layout of the task.\n\nAfter this example you can practice the task yourself.\n\nPress <space> whenever you are ready.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_welcome = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "example"
  exampleClock = new util.Clock();
  example_trial = new visual.ImageStim({
    win : psychoJS.window,
    name : 'example_trial', units : 'height', 
    image : 'instructions/example_trial.png', mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.7, 1],
    color : new util.Color([1,1,1]), opacity : 1.0,
    flipHoriz : false, flipVert : false,
    texRes : 256.0, interpolate : true, depth : 0.0 
  });
  example_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'example_text',
    text: "Let's say you think the most distinct scenario is the one in the middle.\nYou can then use your mouse to select this specific scenario as the odd-one-out. \n\nPress <space> to continue to the practice trials...",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.35)], height: 0.03,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  key_example = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "practice"
  practiceClock = new util.Clock();
  fixation_practice = new visual.ShapeStim ({
    win: psychoJS.window, name: 'fixation_practice', 
    vertices: 'cross', size:[0.05, 0.05],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  frame1_pract = new visual.Rect ({
    win: psychoJS.window, name: 'frame1_pract', units : 'height', 
    width: [0.45, 0.45][0], height: [0.45, 0.45][1],
    ori: 0.0, pos: [(- 0.5), 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color([0.0, 0.0, 0.0]),
    opacity: 1.0, depth: -1, interpolate: true,
  });
  
  frame2_pract = new visual.Rect ({
    win: psychoJS.window, name: 'frame2_pract', units : 'height', 
    width: [0.45, 0.45][0], height: [0.45, 0.45][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color([0.0, 0.0, 0.0]),
    opacity: 1.0, depth: -2, interpolate: true,
  });
  
  frame3_pract = new visual.Rect ({
    win: psychoJS.window, name: 'frame3_pract', units : 'height', 
    width: [0.45, 0.45][0], height: [0.45, 0.45][1],
    ori: 0.0, pos: [0.5, 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color([0.0, 0.0, 0.0]),
    opacity: 1.0, depth: -3, interpolate: true,
  });
  
  stim1_pract = new visual.ImageStim({
    win : psychoJS.window,
    name : 'stim1_pract', units : 'height', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.5), 0], size : [0.4, 0.4],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  stim2_pract = new visual.ImageStim({
    win : psychoJS.window,
    name : 'stim2_pract', units : 'height', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.4, 0.4],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  stim3_pract = new visual.ImageStim({
    win : psychoJS.window,
    name : 'stim3_pract', units : 'height', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.5, 0], size : [0.4, 0.4],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  mouse_pract = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_pract.mouseClock = new util.Clock();
  question_text_pract = new visual.TextStim({
    win: psychoJS.window,
    name: 'question_text_pract',
    text: 'Which is the odd-one-out?',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.35], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  // Initialize components for Routine "pause"
  pauseClock = new util.Clock();
  pause_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'pause_text',
    text: "We have finished practicing!\n\nLet's start with the experiment, the task remains the same as it was during practice.\n\nPress <space> to continue...",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_pause = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "main_exp"
  main_expClock = new util.Clock();
  fixation_main = new visual.ShapeStim ({
    win: psychoJS.window, name: 'fixation_main', 
    vertices: 'cross', size:[0.05, 0.05],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  frame1_main = new visual.Rect ({
    win: psychoJS.window, name: 'frame1_main', 
    width: [0.45, 0.45][0], height: [0.45, 0.45][1],
    ori: 0.0, pos: [(- 0.5), 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color([0.0, 0.0, 0.0]),
    opacity: 1.0, depth: -1, interpolate: true,
  });
  
  frame2_main = new visual.Rect ({
    win: psychoJS.window, name: 'frame2_main', 
    width: [0.45, 0.45][0], height: [0.45, 0.45][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color([0.0, 0.0, 0.0]),
    opacity: 1.0, depth: -2, interpolate: true,
  });
  
  frame3_main = new visual.Rect ({
    win: psychoJS.window, name: 'frame3_main', 
    width: [0.45, 0.45][0], height: [0.45, 0.45][1],
    ori: 0.0, pos: [0.5, 0],
    lineWidth: 2.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('white'),
    fillColor: new util.Color([0.0, 0.0, 0.0]),
    opacity: 1.0, depth: -3, interpolate: true,
  });
  
  stim1_main = new visual.ImageStim({
    win : psychoJS.window,
    name : 'stim1_main', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.5), 0], size : [0.4, 0.4],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  stim2_main = new visual.ImageStim({
    win : psychoJS.window,
    name : 'stim2_main', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.4, 0.4],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  stim3_main = new visual.ImageStim({
    win : psychoJS.window,
    name : 'stim3_main', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.5, 0], size : [0.4, 0.4],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  mouse_main = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_main.mouseClock = new util.Clock();
  question_text_main = new visual.TextStim({
    win: psychoJS.window,
    name: 'question_text_main',
    text: 'Which is the odd-one-out?',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.35], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -8.0 
  });
  
  // Initialize components for Routine "exit"
  exitClock = new util.Clock();
  exit_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'exit_text',
    text: 'That was it!\n\nThank you for your time and attention.\n\nPress <space> to leave the experiment.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  key_exit = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var startComponents;
function startRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'start' ---
    t = 0;
    startClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    startComponents = [];
    
    for (const thisComponent of startComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function startRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'start' ---
    // get current time
    t = startClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of startComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function startRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'start' ---
    for (const thisComponent of startComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "start" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_IC_allKeys;
var current_trial_type;
var current_event;
var current_rt;
var current_time_elapsed;
var ICComponents;
function ICRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'IC' ---
    t = 0;
    ICClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_IC.keys = undefined;
    key_IC.rt = undefined;
    _key_IC_allKeys = [];
    // Run 'Begin Routine' code from code_IC
    // Store timeline information
    current_trial_type = "informed_consent"; // Change as you wish
    current_event = "show_screen"; // Change as you wish
    current_rt = "";
    current_time_elapsed = (global_timer.getTime() - ref_time);
    
    counter = addTrialInfo(current_trial_type, 
        current_event, 
        current_rt, 
        current_time_elapsed,
        counter);
    // To prevent info in same routine to overwrite previous info
    psychoJS.experiment.nextEntry();
    
    
    // keep track of which components have finished
    ICComponents = [];
    ICComponents.push(IC_img);
    ICComponents.push(key_IC);
    
    for (const thisComponent of ICComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var pressed;
function ICRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'IC' ---
    // get current time
    t = ICClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *IC_img* updates
    if (t >= 0.0 && IC_img.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      IC_img.tStart = t;  // (not accounting for frame time here)
      IC_img.frameNStart = frameN;  // exact frame index
      
      IC_img.setAutoDraw(true);
    }

    
    // *key_IC* updates
    if (t >= 0.0 && key_IC.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_IC.tStart = t;  // (not accounting for frame time here)
      key_IC.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_IC.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_IC.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_IC.clearEvents(); });
    }

    if (key_IC.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_IC.getKeys({keyList: ['space'], waitRelease: false});
      _key_IC_allKeys = _key_IC_allKeys.concat(theseKeys);
      if (_key_IC_allKeys.length > 0) {
        key_IC.keys = _key_IC_allKeys[_key_IC_allKeys.length - 1].name;  // just the last key pressed
        key_IC.rt = _key_IC_allKeys[_key_IC_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // Run 'Each Frame' code from code_IC
    pressed = false; // Flag to prevent multiple logs
    
    //Checks for keypresses (only valid ones are allowed)
    // Logs keypress to the datafile when pressed
    if ((typeof key_IC.keys !== 'undefined') && (! pressed)) {
        current_trial_type = "informed_consent";
        current_event = "keypress";
        current_rt = key_IC.rt;
        current_time_elapsed = (global_timer.getTime() - ref_time);
        counter = addTrialInfo(current_trial_type, 
            current_event, 
            current_rt,
            current_time_elapsed,
            counter);
        pressed = true;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of ICComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ICRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'IC' ---
    for (const thisComponent of ICComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_IC.corr, level);
    }
    psychoJS.experiment.addData('key_IC.keys', key_IC.keys);
    if (typeof key_IC.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_IC.rt', key_IC.rt);
        routineTimer.reset();
        }
    
    key_IC.stop();
    // the Routine "IC" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_welcome_allKeys;
var welcomeComponents;
function welcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'welcome' ---
    t = 0;
    welcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_welcome.keys = undefined;
    key_welcome.rt = undefined;
    _key_welcome_allKeys = [];
    // Run 'Begin Routine' code from code_welcome
    current_trial_type = "welcome_screen"; // Change as you wish
    current_event = "show_screen"; // Change as you wish
    current_rt = "";
    current_time_elapsed = (global_timer.getTime() - ref_time);
    
    counter = addTrialInfo(current_trial_type, 
        current_event, 
        current_rt, 
        current_time_elapsed,
        counter);
    // To prevent info in same routine to overwrite previous info
    psychoJS.experiment.nextEntry();
    // keep track of which components have finished
    welcomeComponents = [];
    welcomeComponents.push(welcome_text);
    welcomeComponents.push(key_welcome);
    
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function welcomeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'welcome' ---
    // get current time
    t = welcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *welcome_text* updates
    if (t >= 0.0 && welcome_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      welcome_text.tStart = t;  // (not accounting for frame time here)
      welcome_text.frameNStart = frameN;  // exact frame index
      
      welcome_text.setAutoDraw(true);
    }

    
    // *key_welcome* updates
    if (t >= 1 && key_welcome.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_welcome.tStart = t;  // (not accounting for frame time here)
      key_welcome.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_welcome.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_welcome.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_welcome.clearEvents(); });
    }

    if (key_welcome.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_welcome.getKeys({keyList: ['space'], waitRelease: false});
      _key_welcome_allKeys = _key_welcome_allKeys.concat(theseKeys);
      if (_key_welcome_allKeys.length > 0) {
        key_welcome.keys = _key_welcome_allKeys[_key_welcome_allKeys.length - 1].name;  // just the last key pressed
        key_welcome.rt = _key_welcome_allKeys[_key_welcome_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // Run 'Each Frame' code from code_welcome
    pressed = false;
    
    // Checks for keypresses (only valid ones are allowed)
    // Logs keypress to the datafile when pressed
    if ((typeof key_welcome.keys !== 'undefined') && (! pressed)) {
        current_event = "keypress";
        current_rt = key_welcome.rt;
        current_time_elapsed = (global_timer.getTime() - ref_time);
        
        counter = addTrialInfo(current_trial_type, 
            current_event, 
            current_rt,
            current_time_elapsed,
            counter);
        pressed = true;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of welcomeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function welcomeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'welcome' ---
    for (const thisComponent of welcomeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_welcome.corr, level);
    }
    psychoJS.experiment.addData('key_welcome.keys', key_welcome.keys);
    if (typeof key_welcome.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_welcome.rt', key_welcome.rt);
        routineTimer.reset();
        }
    
    key_welcome.stop();
    // the Routine "welcome" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_example_allKeys;
var exampleComponents;
function exampleRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'example' ---
    t = 0;
    exampleClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_example.keys = undefined;
    key_example.rt = undefined;
    _key_example_allKeys = [];
    // Run 'Begin Routine' code from code_example
    current_trial_type = "example_trial";
    current_event = "show_screen";
    current_rt = "";
    current_time_elapsed = (global_timer.getTime() - ref_time);
    
    counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
    
    // To prevent info in same routine to overwrite previous info
    psychoJS.experiment.nextEntry();
    // keep track of which components have finished
    exampleComponents = [];
    exampleComponents.push(example_trial);
    exampleComponents.push(example_text);
    exampleComponents.push(key_example);
    
    for (const thisComponent of exampleComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function exampleRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'example' ---
    // get current time
    t = exampleClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *example_trial* updates
    if (t >= 0 && example_trial.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      example_trial.tStart = t;  // (not accounting for frame time here)
      example_trial.frameNStart = frameN;  // exact frame index
      
      example_trial.setAutoDraw(true);
    }

    
    // *example_text* updates
    if (t >= 0.0 && example_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      example_text.tStart = t;  // (not accounting for frame time here)
      example_text.frameNStart = frameN;  // exact frame index
      
      example_text.setAutoDraw(true);
    }

    
    // *key_example* updates
    if (t >= 0.0 && key_example.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_example.tStart = t;  // (not accounting for frame time here)
      key_example.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_example.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_example.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_example.clearEvents(); });
    }

    if (key_example.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_example.getKeys({keyList: ['space'], waitRelease: false});
      _key_example_allKeys = _key_example_allKeys.concat(theseKeys);
      if (_key_example_allKeys.length > 0) {
        key_example.keys = _key_example_allKeys[_key_example_allKeys.length - 1].name;  // just the last key pressed
        key_example.rt = _key_example_allKeys[_key_example_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // Run 'Each Frame' code from code_example
    pressed = false; // Flag to prevent multiple logs
    
    // Checks for keypresses (only valid ones are allowed)
    // Logs keypress to the datafile when pressed
    if (((typeof key_example.keys !== 'undefined')  && (! pressed))) {
        current_event = "keypress";
        current_rt = key_example.rt;
        current_time_elapsed = (global_timer.getTime() - ref_time);
        counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
        pressed = true;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of exampleComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function exampleRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'example' ---
    for (const thisComponent of exampleComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_example.corr, level);
    }
    psychoJS.experiment.addData('key_example.keys', key_example.keys);
    if (typeof key_example.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_example.rt', key_example.rt);
        routineTimer.reset();
        }
    
    key_example.stop();
    // the Routine "example" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var practiceTrials;
function practiceTrialsLoopBegin(practiceTrialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    practiceTrials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'datasets/triplets.csv',
      seed: undefined, name: 'practiceTrials'
    });
    psychoJS.experiment.addLoop(practiceTrials); // add the loop to the experiment
    currentLoop = practiceTrials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisPracticeTrial of practiceTrials) {
      snapshot = practiceTrials.getSnapshot();
      practiceTrialsLoopScheduler.add(importConditions(snapshot));
      practiceTrialsLoopScheduler.add(practiceRoutineBegin(snapshot));
      practiceTrialsLoopScheduler.add(practiceRoutineEachFrame());
      practiceTrialsLoopScheduler.add(practiceRoutineEnd(snapshot));
      practiceTrialsLoopScheduler.add(practiceTrialsLoopEndIteration(practiceTrialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function practiceTrialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(practiceTrials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function practiceTrialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var mainTrials;
function mainTrialsLoopBegin(mainTrialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    mainTrials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'datasets/triplets.csv', subset_text),
      seed: undefined, name: 'mainTrials'
    });
    psychoJS.experiment.addLoop(mainTrials); // add the loop to the experiment
    currentLoop = mainTrials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisMainTrial of mainTrials) {
      snapshot = mainTrials.getSnapshot();
      mainTrialsLoopScheduler.add(importConditions(snapshot));
      mainTrialsLoopScheduler.add(main_expRoutineBegin(snapshot));
      mainTrialsLoopScheduler.add(main_expRoutineEachFrame());
      mainTrialsLoopScheduler.add(main_expRoutineEnd(snapshot));
      mainTrialsLoopScheduler.add(mainTrialsLoopEndIteration(mainTrialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function mainTrialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(mainTrials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function mainTrialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var gotValidClick;
var practiceComponents;
function practiceRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'practice' ---
    t = 0;
    practiceClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    stim1_pract.setImage(("stimuli/" + Stim1));
    stim2_pract.setImage(("stimuli/" + Stim2));
    stim3_pract.setImage(("stimuli/" + Stim3));
    // setup some python lists for storing info about the mouse_pract
    // current position of the mouse:
    mouse_pract.x = [];
    mouse_pract.y = [];
    mouse_pract.leftButton = [];
    mouse_pract.midButton = [];
    mouse_pract.rightButton = [];
    mouse_pract.time = [];
    mouse_pract.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from code_pract
    // Store timeline information
    current_trial_type = "practice_trial"; // Change as you wish
    current_event = "stimulus_presentation"; // Change as you wish
    current_rt = "";
    current_time_elapsed = (global_timer.getTime() - ref_time);
    counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
    
    // Go to next row to prevent overwriting information.
    psychoJS.experiment.nextEntry();
    
    // keep track of which components have finished
    practiceComponents = [];
    practiceComponents.push(fixation_practice);
    practiceComponents.push(frame1_pract);
    practiceComponents.push(frame2_pract);
    practiceComponents.push(frame3_pract);
    practiceComponents.push(stim1_pract);
    practiceComponents.push(stim2_pract);
    practiceComponents.push(stim3_pract);
    practiceComponents.push(mouse_pract);
    practiceComponents.push(question_text_pract);
    
    for (const thisComponent of practiceComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
var prevButtonState;
var _mouseButtons;
var _mouseXYs;
function practiceRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'practice' ---
    // get current time
    t = practiceClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation_practice* updates
    if (t >= 0.0 && fixation_practice.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_practice.tStart = t;  // (not accounting for frame time here)
      fixation_practice.frameNStart = frameN;  // exact frame index
      
      fixation_practice.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fixation_practice.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fixation_practice.setAutoDraw(false);
    }
    
    // *frame1_pract* updates
    if (t >= 0.5 && frame1_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      frame1_pract.tStart = t;  // (not accounting for frame time here)
      frame1_pract.frameNStart = frameN;  // exact frame index
      
      frame1_pract.setAutoDraw(true);
    }

    
    if (frame1_pract.status === PsychoJS.Status.STARTED){ // only update if being drawn
      frame1_pract.setOpacity(0.0, false);
    }
    
    // *frame2_pract* updates
    if (t >= 0.5 && frame2_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      frame2_pract.tStart = t;  // (not accounting for frame time here)
      frame2_pract.frameNStart = frameN;  // exact frame index
      
      frame2_pract.setAutoDraw(true);
    }

    
    if (frame2_pract.status === PsychoJS.Status.STARTED){ // only update if being drawn
      frame2_pract.setOpacity(0.0, false);
    }
    
    // *frame3_pract* updates
    if (t >= 0.5 && frame3_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      frame3_pract.tStart = t;  // (not accounting for frame time here)
      frame3_pract.frameNStart = frameN;  // exact frame index
      
      frame3_pract.setAutoDraw(true);
    }

    
    if (frame3_pract.status === PsychoJS.Status.STARTED){ // only update if being drawn
      frame3_pract.setOpacity(0.0, false);
    }
    
    // *stim1_pract* updates
    if (t >= 0.5 && stim1_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stim1_pract.tStart = t;  // (not accounting for frame time here)
      stim1_pract.frameNStart = frameN;  // exact frame index
      
      stim1_pract.setAutoDraw(true);
    }

    
    // *stim2_pract* updates
    if (t >= 0.5 && stim2_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stim2_pract.tStart = t;  // (not accounting for frame time here)
      stim2_pract.frameNStart = frameN;  // exact frame index
      
      stim2_pract.setAutoDraw(true);
    }

    
    // *stim3_pract* updates
    if (t >= 0.5 && stim3_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stim3_pract.tStart = t;  // (not accounting for frame time here)
      stim3_pract.frameNStart = frameN;  // exact frame index
      
      stim3_pract.setAutoDraw(true);
    }

    // *mouse_pract* updates
    if (t >= 0.5 && mouse_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_pract.tStart = t;  // (not accounting for frame time here)
      mouse_pract.frameNStart = frameN;  // exact frame index
      
      mouse_pract.status = PsychoJS.Status.STARTED;
      mouse_pract.mouseClock.reset();
      prevButtonState = mouse_pract.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_pract.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_pract.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [stim1_pract, stim2_pract, stim3_pract]) {
            if (obj.contains(mouse_pract)) {
              gotValidClick = true;
              mouse_pract.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { 
            _mouseXYs = mouse_pract.getPos();
            mouse_pract.x.push(_mouseXYs[0]);
            mouse_pract.y.push(_mouseXYs[1]);
            mouse_pract.leftButton.push(_mouseButtons[0]);
            mouse_pract.midButton.push(_mouseButtons[1]);
            mouse_pract.rightButton.push(_mouseButtons[2]);
            mouse_pract.time.push(mouse_pract.mouseClock.getTime());
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *question_text_pract* updates
    if (t >= 0.5 && question_text_pract.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      question_text_pract.tStart = t;  // (not accounting for frame time here)
      question_text_pract.frameNStart = frameN;  // exact frame index
      
      question_text_pract.setAutoDraw(true);
    }

    // Run 'Each Frame' code from code_pract
    // If mouse cursor hovers over any stimulus, present square frame.
    // Otherwise, hide it
    if (mouseOnStim(stim1_pract, mouse_pract)) {
        frame1_pract.opacity = 1;
    } else {
        frame1_pract.opacity = 0;
    }
    if (mouseOnStim(stim2_pract, mouse_pract)) {
        frame2_pract.opacity = 1;
    } else {
        frame2_pract.opacity = 0;
    }
    if (mouseOnStim(stim3_pract, mouse_pract)) {
        frame3_pract.opacity = 1;
    } else {
        frame3_pract.opacity = 0;
    }
    // Log response if a valid click was received    
    if (gotValidClick) {
        current_time_elapsed = (global_timer.getTime() - ref_time);
        counter = logClickResponse(mouse_pract, current_trial_type, (practiceTrials.thisN + 1), current_time_elapsed, counter);
    }
    // Stop routine after n trials
    if ((practiceTrials.thisN === (nPractice - 1))) {
        practiceTrials.finished = true;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of practiceComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function practiceRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'practice' ---
    for (const thisComponent of practiceComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    if (mouse_pract.x) {  psychoJS.experiment.addData('mouse_pract.x', mouse_pract.x[0])};
    if (mouse_pract.y) {  psychoJS.experiment.addData('mouse_pract.y', mouse_pract.y[0])};
    if (mouse_pract.leftButton) {  psychoJS.experiment.addData('mouse_pract.leftButton', mouse_pract.leftButton[0])};
    if (mouse_pract.midButton) {  psychoJS.experiment.addData('mouse_pract.midButton', mouse_pract.midButton[0])};
    if (mouse_pract.rightButton) {  psychoJS.experiment.addData('mouse_pract.rightButton', mouse_pract.rightButton[0])};
    if (mouse_pract.time) {  psychoJS.experiment.addData('mouse_pract.time', mouse_pract.time[0])};
    if (mouse_pract.clicked_name) {  psychoJS.experiment.addData('mouse_pract.clicked_name', mouse_pract.clicked_name[0])};
    
    // the Routine "practice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_pause_allKeys;
var pauseComponents;
function pauseRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'pause' ---
    t = 0;
    pauseClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_pause.keys = undefined;
    key_pause.rt = undefined;
    _key_pause_allKeys = [];
    // Run 'Begin Routine' code from code_pause
    // Store timeline information
    current_trial_type = "pause_trial";
    current_event = "show_screen";
    current_rt = "";
    current_time_elapsed = (global_timer.getTime() - ref_time);
    counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
    
    // To prevent info in same routine to overwrite previous info
    psychoJS.experiment.nextEntry();
    // keep track of which components have finished
    pauseComponents = [];
    pauseComponents.push(pause_text);
    pauseComponents.push(key_pause);
    
    for (const thisComponent of pauseComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function pauseRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'pause' ---
    // get current time
    t = pauseClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *pause_text* updates
    if (t >= 0.0 && pause_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      pause_text.tStart = t;  // (not accounting for frame time here)
      pause_text.frameNStart = frameN;  // exact frame index
      
      pause_text.setAutoDraw(true);
    }

    
    // *key_pause* updates
    if (t >= 0.0 && key_pause.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_pause.tStart = t;  // (not accounting for frame time here)
      key_pause.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_pause.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_pause.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_pause.clearEvents(); });
    }

    if (key_pause.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_pause.getKeys({keyList: ['space'], waitRelease: false});
      _key_pause_allKeys = _key_pause_allKeys.concat(theseKeys);
      if (_key_pause_allKeys.length > 0) {
        key_pause.keys = _key_pause_allKeys[_key_pause_allKeys.length - 1].name;  // just the last key pressed
        key_pause.rt = _key_pause_allKeys[_key_pause_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // Run 'Each Frame' code from code_pause
    pressed = false; // Flag to prevent multiple logs
    
    // Checks for keypresses (only valid ones are allowed)
    // Logs keypress to the datafile when pressed
    if (((typeof key_pause.keys !== 'undefined') && (! pressed))) {
        current_event = "keypress";
        current_rt = key_pause.rt;
        current_time_elapsed = (global_timer.getTime() - ref_time);
        counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
        pressed = true;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of pauseComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function pauseRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'pause' ---
    for (const thisComponent of pauseComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_pause.corr, level);
    }
    psychoJS.experiment.addData('key_pause.keys', key_pause.keys);
    if (typeof key_pause.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_pause.rt', key_pause.rt);
        routineTimer.reset();
        }
    
    key_pause.stop();
    // the Routine "pause" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var main_expComponents;
function main_expRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'main_exp' ---
    t = 0;
    main_expClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    stim1_main.setImage(("stimuli/" + Stim1));
    stim2_main.setImage(("stimuli/" + Stim2));
    stim3_main.setImage(("stimuli/" + Stim3));
    // setup some python lists for storing info about the mouse_main
    // current position of the mouse:
    mouse_main.x = [];
    mouse_main.y = [];
    mouse_main.leftButton = [];
    mouse_main.midButton = [];
    mouse_main.rightButton = [];
    mouse_main.time = [];
    mouse_main.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from code_main
    // Store timeline information
    current_trial_type = "main_trial";
    current_event = "stimulus_presentation";
    current_rt = "";
    current_time_elapsed = (global_timer.getTime() - ref_time);
    counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
    // Go to next row to prevent overwriting information.
    psychoJS.experiment.nextEntry();
    // keep track of which components have finished
    main_expComponents = [];
    main_expComponents.push(fixation_main);
    main_expComponents.push(frame1_main);
    main_expComponents.push(frame2_main);
    main_expComponents.push(frame3_main);
    main_expComponents.push(stim1_main);
    main_expComponents.push(stim2_main);
    main_expComponents.push(stim3_main);
    main_expComponents.push(mouse_main);
    main_expComponents.push(question_text_main);
    
    for (const thisComponent of main_expComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function main_expRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'main_exp' ---
    // get current time
    t = main_expClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation_main* updates
    if (t >= 0.0 && fixation_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_main.tStart = t;  // (not accounting for frame time here)
      fixation_main.frameNStart = frameN;  // exact frame index
      
      fixation_main.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (fixation_main.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      fixation_main.setAutoDraw(false);
    }
    
    // *frame1_main* updates
    if (t >= 0.5 && frame1_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      frame1_main.tStart = t;  // (not accounting for frame time here)
      frame1_main.frameNStart = frameN;  // exact frame index
      
      frame1_main.setAutoDraw(true);
    }

    
    if (frame1_main.status === PsychoJS.Status.STARTED){ // only update if being drawn
      frame1_main.setOpacity(0.0, false);
    }
    
    // *frame2_main* updates
    if (t >= 0.5 && frame2_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      frame2_main.tStart = t;  // (not accounting for frame time here)
      frame2_main.frameNStart = frameN;  // exact frame index
      
      frame2_main.setAutoDraw(true);
    }

    
    if (frame2_main.status === PsychoJS.Status.STARTED){ // only update if being drawn
      frame2_main.setOpacity(0.0, false);
    }
    
    // *frame3_main* updates
    if (t >= 0.5 && frame3_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      frame3_main.tStart = t;  // (not accounting for frame time here)
      frame3_main.frameNStart = frameN;  // exact frame index
      
      frame3_main.setAutoDraw(true);
    }

    
    if (frame3_main.status === PsychoJS.Status.STARTED){ // only update if being drawn
      frame3_main.setOpacity(0.0, false);
    }
    
    // *stim1_main* updates
    if (t >= 0.5 && stim1_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stim1_main.tStart = t;  // (not accounting for frame time here)
      stim1_main.frameNStart = frameN;  // exact frame index
      
      stim1_main.setAutoDraw(true);
    }

    
    // *stim2_main* updates
    if (t >= 0.5 && stim2_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stim2_main.tStart = t;  // (not accounting for frame time here)
      stim2_main.frameNStart = frameN;  // exact frame index
      
      stim2_main.setAutoDraw(true);
    }

    
    // *stim3_main* updates
    if (t >= 0.5 && stim3_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      stim3_main.tStart = t;  // (not accounting for frame time here)
      stim3_main.frameNStart = frameN;  // exact frame index
      
      stim3_main.setAutoDraw(true);
    }

    // *mouse_main* updates
    if (t >= 0.5 && mouse_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_main.tStart = t;  // (not accounting for frame time here)
      mouse_main.frameNStart = frameN;  // exact frame index
      
      mouse_main.status = PsychoJS.Status.STARTED;
      mouse_main.mouseClock.reset();
      prevButtonState = mouse_main.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_main.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_main.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [stim1_main, stim2_main, stim3_main]) {
            if (obj.contains(mouse_main)) {
              gotValidClick = true;
              mouse_main.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { 
            _mouseXYs = mouse_main.getPos();
            mouse_main.x.push(_mouseXYs[0]);
            mouse_main.y.push(_mouseXYs[1]);
            mouse_main.leftButton.push(_mouseButtons[0]);
            mouse_main.midButton.push(_mouseButtons[1]);
            mouse_main.rightButton.push(_mouseButtons[2]);
            mouse_main.time.push(mouse_main.mouseClock.getTime());
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *question_text_main* updates
    if (t >= 0.5 && question_text_main.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      question_text_main.tStart = t;  // (not accounting for frame time here)
      question_text_main.frameNStart = frameN;  // exact frame index
      
      question_text_main.setAutoDraw(true);
    }

    // Run 'Each Frame' code from code_main
    // If mouse cursor hovers over any stimulus, present square frame.
    // Otherwise, hide it
    if (mouseOnStim(stim1_main, mouse_main)) {
        frame1_main.opacity = 1;
    } else {
        frame1_main.opacity = 0;
    }
    if (mouseOnStim(stim2_main, mouse_main)) {
        frame2_main.opacity = 1;
    } else {
        frame2_main.opacity = 0;
    }
    if (mouseOnStim(stim3_main, mouse_main)) {
        frame3_main.opacity = 1;
    } else {
        frame3_main.opacity = 0;
    }
    // Log response if a valid click was received   
    if (gotValidClick) {
        // Get time elapsed since start exp.
        current_time_elapsed = (global_timer.getTime() - ref_time);
        // Log response
        counter = logClickResponse(mouse_main, current_trial_type, (mainTrials.thisN + 1), current_time_elapsed, counter);
    }
    
    // Stop routine after nMain trials  
    if ((mainTrials.thisN === (nMain - 1))) {
        mainTrials.finished = true;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of main_expComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function main_expRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'main_exp' ---
    for (const thisComponent of main_expComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    if (mouse_main.x) {  psychoJS.experiment.addData('mouse_main.x', mouse_main.x[0])};
    if (mouse_main.y) {  psychoJS.experiment.addData('mouse_main.y', mouse_main.y[0])};
    if (mouse_main.leftButton) {  psychoJS.experiment.addData('mouse_main.leftButton', mouse_main.leftButton[0])};
    if (mouse_main.midButton) {  psychoJS.experiment.addData('mouse_main.midButton', mouse_main.midButton[0])};
    if (mouse_main.rightButton) {  psychoJS.experiment.addData('mouse_main.rightButton', mouse_main.rightButton[0])};
    if (mouse_main.time) {  psychoJS.experiment.addData('mouse_main.time', mouse_main.time[0])};
    if (mouse_main.clicked_name) {  psychoJS.experiment.addData('mouse_main.clicked_name', mouse_main.clicked_name[0])};
    
    // the Routine "main_exp" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _key_exit_allKeys;
var exitComponents;
function exitRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'exit' ---
    t = 0;
    exitClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    key_exit.keys = undefined;
    key_exit.rt = undefined;
    _key_exit_allKeys = [];
    // Run 'Begin Routine' code from code_exit
    // Store timeline information
    current_trial_type = "exit_trial";
    current_event = "show_screen";
    current_rt = "";
    current_time_elapsed = (global_timer.getTime() - ref_time);
    counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
    
    // To prevent info in same routine to overwrite previous info
    psychoJS.experiment.nextEntry();
    // keep track of which components have finished
    exitComponents = [];
    exitComponents.push(exit_text);
    exitComponents.push(key_exit);
    
    for (const thisComponent of exitComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function exitRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'exit' ---
    // get current time
    t = exitClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *exit_text* updates
    if (t >= 0.0 && exit_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exit_text.tStart = t;  // (not accounting for frame time here)
      exit_text.frameNStart = frameN;  // exact frame index
      
      exit_text.setAutoDraw(true);
    }

    
    // *key_exit* updates
    if (t >= 0.5 && key_exit.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_exit.tStart = t;  // (not accounting for frame time here)
      key_exit.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_exit.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_exit.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_exit.clearEvents(); });
    }

    if (key_exit.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_exit.getKeys({keyList: ['space'], waitRelease: false});
      _key_exit_allKeys = _key_exit_allKeys.concat(theseKeys);
      if (_key_exit_allKeys.length > 0) {
        key_exit.keys = _key_exit_allKeys[_key_exit_allKeys.length - 1].name;  // just the last key pressed
        key_exit.rt = _key_exit_allKeys[_key_exit_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // Run 'Each Frame' code from code_exit
    pressed = false; // Flag to prevent multiple logs
    
    // Checks for keypresses (only valid ones are allowed)
    // Logs keypress to the datafile when pressed
    if (((typeof key_exit.keys !== 'undefined') && (! pressed))) {
        current_event = "keypress";
        current_rt = key_exit.rt;
        current_time_elapsed = (global_timer.getTime() - ref_time);
        counter = addTrialInfo(current_trial_type, current_event, current_rt, current_time_elapsed, counter);
        pressed = true;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of exitComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function exitRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'exit' ---
    for (const thisComponent of exitComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(key_exit.corr, level);
    }
    psychoJS.experiment.addData('key_exit.keys', key_exit.keys);
    if (typeof key_exit.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_exit.rt', key_exit.rt);
        routineTimer.reset();
        }
    
    key_exit.stop();
    // the Routine "exit" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
