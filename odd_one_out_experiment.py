#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2022.2.5),
    on mei 28, 2024, at 11:25
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from global_code
# Initialize counter
counter = 0

# Set number of trials per loop. Change as you wish
# These are used in the code blocks of each loop
nPractice = 2 
nMain = 2
# Creates text definition for subset 
# to be used in main trials loop.
subset_text = str(nPractice) + ":-1"

# Starts timer to keep track of elapsed time
global_timer = core.Clock()
ref_time = global_timer.getTime()

# function to add trial information
def addTrialInfo(trial_type, event, rt, time_elapsed, index_count):
    thisExp.addData('trial_type', trial_type)
    thisExp.addData('trial_index', index_count)
    thisExp.addData('event', event)
    thisExp.addData('rt', rt*1000) # Expects seconds, converts to ms
    thisExp.addData('time_elapsed', time_elapsed*1000) # Same
    # Update counter
    index_count = index_count + 1
    return index_count
 
# Function to check if the mouse is hovering over a stimulus 
def mouseOnStim(stim, mouse):
    # Set variables
    mousePos = mouse.getPos()
    mousePosX = mousePos[0]
    mousePosY = mousePos[1]
    mouseWithinX = False
    mouseWithinY = False
    # Check whether mouse is within image on X-axis
    # First determine x-range covered by stimulus
    stimPos = stim.pos
    stimHalfSizeX = stim.size[0]/2
    stimHalfSizeY = stim.size[1]/2
    stimLBound = stimPos[0] - stimHalfSizeX
    stimRBound = stimPos[0] + stimHalfSizeX
    # Do the same for y range
    stimLoBound = stimPos[1] - stimHalfSizeY
    stimHiBound = stimPos[1] + stimHalfSizeY

    # Check whether in x-range
    if mousePosX > stimLBound and mousePosX < stimRBound:
        mouseWithinX = True
    else:
        mouseWithinX = False
    
    # Check whether in y-range
    if mousePosY > stimLoBound and mousePosY < stimHiBound:
        mouseWithinY = True
    else:
        mouseWithinY = False
    
    # Return state
    return mouseWithinX and mouseWithinY

# Takes in mouse object and logs response for clickable trials
def logClickResponse(mouseObject, trial_type, trial_num, time_elapsed, trial_index):
    mouse_rt = mouseObject.time[0]
    response = mouseObject.clicked_name[0]
    stimulus = [Stim1, Stim2, Stim3]
    
    # Create info for response and file_name columns
    if "stim1" in response:
        response = 1
        file_name = Stim1
    elif "stim2" in response:
        response = 2
        file_name = Stim2
    else:
        response = 3
        file_name = Stim3
        
    thisExp.addData('trial_type', trial_type)
    thisExp.addData('trial_index', trial_index)
    thisExp.addData('event', "click_response")
    thisExp.addData('time_elapsed', time_elapsed*1000)
    thisExp.addData('stimulus', stimulus)
    thisExp.addData('response', response)
    thisExp.addData('filename', file_name)
    thisExp.addData('trial_number', trial_num)
    thisExp.addData('rt', mouse_rt*1000)
    trial_index = trial_index + 1
    return trial_index


# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2022.2.5'
expName = 'odd_one_out'  # from the Builder filename that created this script
expInfo = {
    'participant': '000',
}
# --- Show participant info dialog --
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/' + 'sub_' + expInfo['participant'] + '/sub%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='C:\\Users\\tomva\\OneDrive\\KU Leuven\\Master Theory and Research\\StudentJob\\Triplet similarity experiment\\Pavlovia\\odd_one_out_experiment.py',
    savePickle=True, saveWideText=False,
    dataFileName=filename)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# --- Setup the Window ---
win = visual.Window(
    size=[1920, 1080], fullscr=True, screen=1, 
    winType='pyglet', allowStencil=False,
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
    blendMode='avg', useFBO=True, 
    units='height')
win.mouseVisible = True
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = None

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# --- Initialize components for Routine "start" ---
# Run 'Begin Experiment' code from global_code
# Store timeline information
current_trial_type = "start experiment"
current_event = "loading"
current_rt = ""
# Get current elapsed time
current_time_elapsed = global_timer.getTime()-ref_time

# Store info in trial_info and return updated counter
counter = addTrialInfo(current_trial_type, 
    current_event, 
    current_rt,
    current_time_elapsed,
    counter)
    
# Add other columns to datafile but leave empty for now
thisExp.addData('stimulus', "")
thisExp.addData('response', "")
thisExp.addData('file_name',"")
thisExp.addData('trial_number',"")

# --- Initialize components for Routine "IC" ---
IC_img = visual.ImageStim(
    win=win,
    name='IC_img', 
    image='informed_consent/informed_consent.png', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.8, 1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=0.0)
key_IC = keyboard.Keyboard()

# --- Initialize components for Routine "welcome" ---
welcome_text = visual.TextStim(win=win, name='welcome_text',
    text="Welcome, in this experiment you will be presented with three chess scenario's, side-by-side.\n\nIt is your task to select the odd-one-out. In other words, choose the one you think is the most different when comparing to the other two scenario's.\n\nTo select the odd-one-out you can use your mouse. Click on the scenario you think is the most distinct. There is no time limit.\n\nWe will begin by presenting an example of a single trial. For this example there is no need to concentrate on whether the decision is correct; instead, make yourself familiar with the overal layout of the task.\n\nAfter this example you can practice the task yourself.\n\nPress <space> whenever you are ready.",
    font='Open Sans',
    pos=(0, 0), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_welcome = keyboard.Keyboard()

# --- Initialize components for Routine "example" ---
example_trial = visual.ImageStim(
    win=win,
    name='example_trial', units='height', 
    image='instructions/example_trial.png', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(1.7, 1),
    color=[1,1,1], colorSpace='rgb', opacity=1.0,
    flipHoriz=False, flipVert=False,
    texRes=256.0, interpolate=True, depth=0.0)
example_text = visual.TextStim(win=win, name='example_text',
    text="Let's say you think the most distinct scenario is the one in the middle.\nYou can then use your mouse to select this specific scenario as the odd-one-out. \n\nPress <space> to continue to the practice trials...",
    font='Open Sans',
    pos=(0, -0.35), height=0.03, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
key_example = keyboard.Keyboard()

# --- Initialize components for Routine "practice" ---
fixation_practice = visual.ShapeStim(
    win=win, name='fixation_practice', vertices='cross',
    size=(0.05, 0.05),
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='white', fillColor='white',
    opacity=None, depth=0.0, interpolate=True)
frame1_pract = visual.Rect(
    win=win, name='frame1_pract',units='height', 
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(-0.5, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=[0.0000, 0.0000, 0.0000],
    opacity=1.0, depth=-1.0, interpolate=True)
frame2_pract = visual.Rect(
    win=win, name='frame2_pract',units='height', 
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(0,0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=[0.0000, 0.0000, 0.0000],
    opacity=1.0, depth=-2.0, interpolate=True)
frame3_pract = visual.Rect(
    win=win, name='frame3_pract',units='height', 
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(0.5, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=[0.0000, 0.0000, 0.0000],
    opacity=1.0, depth=-3.0, interpolate=True)
stim1_pract = visual.ImageStim(
    win=win,
    name='stim1_pract', units='height', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=(-0.5, 0), size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
stim2_pract = visual.ImageStim(
    win=win,
    name='stim2_pract', units='height', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
stim3_pract = visual.ImageStim(
    win=win,
    name='stim3_pract', units='height', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=(0.5, 0), size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)
mouse_pract = event.Mouse(win=win)
x, y = [None, None]
mouse_pract.mouseClock = core.Clock()
question_text_pract = visual.TextStim(win=win, name='question_text_pract',
    text='Which is the odd-one-out?',
    font='Open Sans',
    pos=(0, 0.35), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-8.0);

# --- Initialize components for Routine "pause" ---
pause_text = visual.TextStim(win=win, name='pause_text',
    text="We have finished practicing!\n\nLet's start with the experiment, the task remains the same as it was during practice.\n\nPress <space> to continue...",
    font='Open Sans',
    pos=(0, 0), height=0.04, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_pause = keyboard.Keyboard()

# --- Initialize components for Routine "main_exp" ---
fixation_main = visual.ShapeStim(
    win=win, name='fixation_main', vertices='cross',
    size=(0.05, 0.05),
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor='white', fillColor='white',
    opacity=None, depth=0.0, interpolate=True)
frame1_main = visual.Rect(
    win=win, name='frame1_main',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(-0.5, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=[0.0000, 0.0000, 0.0000],
    opacity=1.0, depth=-1.0, interpolate=True)
frame2_main = visual.Rect(
    win=win, name='frame2_main',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(0, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=[0.0000, 0.0000, 0.0000],
    opacity=1.0, depth=-2.0, interpolate=True)
frame3_main = visual.Rect(
    win=win, name='frame3_main',
    width=(0.45, 0.45)[0], height=(0.45, 0.45)[1],
    ori=0.0, pos=(0.5, 0), anchor='center',
    lineWidth=2.0,     colorSpace='rgb',  lineColor='white', fillColor=[0.0000, 0.0000, 0.0000],
    opacity=1.0, depth=-3.0, interpolate=True)
stim1_main = visual.ImageStim(
    win=win,
    name='stim1_main', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=(-0.5, 0), size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
stim2_main = visual.ImageStim(
    win=win,
    name='stim2_main', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=(0, 0), size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
stim3_main = visual.ImageStim(
    win=win,
    name='stim3_main', 
    image='sin', mask=None, anchor='center',
    ori=0.0, pos=(0.5, 0), size=(0.4, 0.4),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)
mouse_main = event.Mouse(win=win)
x, y = [None, None]
mouse_main.mouseClock = core.Clock()
question_text_main = visual.TextStim(win=win, name='question_text_main',
    text='Which is the odd-one-out?',
    font='Open Sans',
    pos=(0, 0.35), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-8.0);

# --- Initialize components for Routine "exit" ---
exit_text = visual.TextStim(win=win, name='exit_text',
    text='That was it!\n\nThank you for your time and attention.\n\nPress <space> to leave the experiment.',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
key_exit = keyboard.Keyboard()

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "start" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
# keep track of which components have finished
startComponents = []
for thisComponent in startComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "start" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in startComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "start" ---
for thisComponent in startComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# the Routine "start" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "IC" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_IC.keys = []
key_IC.rt = []
_key_IC_allKeys = []
# Run 'Begin Routine' code from code_IC
# Store timeline information
current_trial_type = "informed_consent" # Change as you wish
current_event = "show_screen" # Change as you wish
current_rt = ""
current_time_elapsed = global_timer.getTime()-ref_time

counter = addTrialInfo(current_trial_type, 
    current_event, 
    current_rt,
    current_time_elapsed,
    counter)
    
thisExp.nextEntry()
# keep track of which components have finished
ICComponents = [IC_img, key_IC]
for thisComponent in ICComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "IC" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *IC_img* updates
    if IC_img.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        IC_img.frameNStart = frameN  # exact frame index
        IC_img.tStart = t  # local t and not account for scr refresh
        IC_img.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(IC_img, 'tStartRefresh')  # time at next scr refresh
        IC_img.setAutoDraw(True)
    
    # *key_IC* updates
    waitOnFlip = False
    if key_IC.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_IC.frameNStart = frameN  # exact frame index
        key_IC.tStart = t  # local t and not account for scr refresh
        key_IC.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_IC, 'tStartRefresh')  # time at next scr refresh
        key_IC.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_IC.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_IC.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_IC.status == STARTED and not waitOnFlip:
        theseKeys = key_IC.getKeys(keyList=['space'], waitRelease=False)
        _key_IC_allKeys.extend(theseKeys)
        if len(_key_IC_allKeys):
            key_IC.keys = _key_IC_allKeys[-1].name  # just the last key pressed
            key_IC.rt = _key_IC_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    # Run 'Each Frame' code from code_IC
    pressed = False # Flag to prevent multiple logs
    
    # Checks for keypresses (only valid ones are allowed)
    # Logs keypress to the datafile when pressed
    if len(key_IC.keys) > 0 and not pressed:
        # Store timeline information
        current_trial_type = "informed_consent"
        current_event = "keypress"
        current_rt = key_IC.rt
        current_time_elapsed = global_timer.getTime()-ref_time
    
        counter = addTrialInfo(current_trial_type, 
            current_event, 
            current_rt,
            current_time_elapsed,
            counter)
        pressed = True
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in ICComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "IC" ---
for thisComponent in ICComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_IC.keys in ['', [], None]:  # No response was made
    key_IC.keys = None
thisExp.addData('key_IC.keys',key_IC.keys)
if key_IC.keys != None:  # we had a response
    thisExp.addData('key_IC.rt', key_IC.rt)
thisExp.nextEntry()
# the Routine "IC" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "welcome" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_welcome.keys = []
key_welcome.rt = []
_key_welcome_allKeys = []
# Run 'Begin Routine' code from code_welcome
# Store timeline information
current_trial_type = "welcome_screen" # Change as you wish
current_event = "show_screen" # Change as you wish
current_rt = ""
current_time_elapsed = global_timer.getTime()-ref_time

counter = addTrialInfo(current_trial_type, 
    current_event, 
    current_rt,
    current_time_elapsed,
    counter)
    
thisExp.nextEntry()
# keep track of which components have finished
welcomeComponents = [welcome_text, key_welcome]
for thisComponent in welcomeComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "welcome" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *welcome_text* updates
    if welcome_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        welcome_text.frameNStart = frameN  # exact frame index
        welcome_text.tStart = t  # local t and not account for scr refresh
        welcome_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(welcome_text, 'tStartRefresh')  # time at next scr refresh
        welcome_text.setAutoDraw(True)
    
    # *key_welcome* updates
    waitOnFlip = False
    if key_welcome.status == NOT_STARTED and tThisFlip >= 1-frameTolerance:
        # keep track of start time/frame for later
        key_welcome.frameNStart = frameN  # exact frame index
        key_welcome.tStart = t  # local t and not account for scr refresh
        key_welcome.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_welcome, 'tStartRefresh')  # time at next scr refresh
        key_welcome.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_welcome.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_welcome.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_welcome.status == STARTED and not waitOnFlip:
        theseKeys = key_welcome.getKeys(keyList=['space'], waitRelease=False)
        _key_welcome_allKeys.extend(theseKeys)
        if len(_key_welcome_allKeys):
            key_welcome.keys = _key_welcome_allKeys[-1].name  # just the last key pressed
            key_welcome.rt = _key_welcome_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    # Run 'Each Frame' code from code_welcome
    pressed = False # Flag to prevent multiple logs
    
    # Checks for keypresses (only valid ones are allowed)
    # Logs keypress to the datafile when pressed
    if len(key_welcome.keys) > 0 and not pressed:
        # Store timeline information
        current_event = "keypress"
        current_rt = key_welcome.rt
        current_time_elapsed = global_timer.getTime()-ref_time
    
        counter = addTrialInfo(current_trial_type, 
            current_event, 
            current_rt,
            current_time_elapsed,
            counter)
        pressed = True
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in welcomeComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "welcome" ---
for thisComponent in welcomeComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_welcome.keys in ['', [], None]:  # No response was made
    key_welcome.keys = None
thisExp.addData('key_welcome.keys',key_welcome.keys)
if key_welcome.keys != None:  # we had a response
    thisExp.addData('key_welcome.rt', key_welcome.rt)
thisExp.nextEntry()
# the Routine "welcome" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "example" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_example.keys = []
key_example.rt = []
_key_example_allKeys = []
# Run 'Begin Routine' code from code_example
# Store timeline information
current_trial_type = "example_trial"
current_event = "show_screen"
current_rt = ""
current_time_elapsed = global_timer.getTime()-ref_time

counter = addTrialInfo(current_trial_type, 
    current_event, 
    current_rt,
    current_time_elapsed,
    counter)
# keep track of which components have finished
exampleComponents = [example_trial, example_text, key_example]
for thisComponent in exampleComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "example" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *example_trial* updates
    if example_trial.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
        # keep track of start time/frame for later
        example_trial.frameNStart = frameN  # exact frame index
        example_trial.tStart = t  # local t and not account for scr refresh
        example_trial.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(example_trial, 'tStartRefresh')  # time at next scr refresh
        example_trial.setAutoDraw(True)
    
    # *example_text* updates
    if example_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        example_text.frameNStart = frameN  # exact frame index
        example_text.tStart = t  # local t and not account for scr refresh
        example_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(example_text, 'tStartRefresh')  # time at next scr refresh
        example_text.setAutoDraw(True)
    
    # *key_example* updates
    waitOnFlip = False
    if key_example.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_example.frameNStart = frameN  # exact frame index
        key_example.tStart = t  # local t and not account for scr refresh
        key_example.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_example, 'tStartRefresh')  # time at next scr refresh
        key_example.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_example.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_example.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_example.status == STARTED and not waitOnFlip:
        theseKeys = key_example.getKeys(keyList=['space'], waitRelease=False)
        _key_example_allKeys.extend(theseKeys)
        if len(_key_example_allKeys):
            key_example.keys = _key_example_allKeys[-1].name  # just the last key pressed
            key_example.rt = _key_example_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    # Run 'Each Frame' code from code_example
    pressed = False # Flag to prevent multiple logs
    
    # Checks for keypresses (only valid ones are allowed)
    # Logs keypress to the datafile when pressed
    if len(key_example.keys) > 0 and not pressed:
        # Store timeline information
        current_event = "keypress"
        current_rt = key_example.rt
        current_time_elapsed = global_timer.getTime()-ref_time
    
        counter = addTrialInfo(current_trial_type, 
            current_event, 
            current_rt,
            current_time_elapsed,
            counter)
        pressed = True
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in exampleComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "example" ---
for thisComponent in exampleComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_example.keys in ['', [], None]:  # No response was made
    key_example.keys = None
thisExp.addData('key_example.keys',key_example.keys)
if key_example.keys != None:  # we had a response
    thisExp.addData('key_example.rt', key_example.rt)
thisExp.nextEntry()
# the Routine "example" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
practiceTrials = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('datasets/triplets.csv'),
    seed=None, name='practiceTrials')
thisExp.addLoop(practiceTrials)  # add the loop to the experiment
thisPracticeTrial = practiceTrials.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisPracticeTrial.rgb)
if thisPracticeTrial != None:
    for paramName in thisPracticeTrial:
        exec('{} = thisPracticeTrial[paramName]'.format(paramName))

for thisPracticeTrial in practiceTrials:
    currentLoop = practiceTrials
    # abbreviate parameter names if possible (e.g. rgb = thisPracticeTrial.rgb)
    if thisPracticeTrial != None:
        for paramName in thisPracticeTrial:
            exec('{} = thisPracticeTrial[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "practice" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    stim1_pract.setImage('stimuli/' + Stim1)
    stim2_pract.setImage('stimuli/' + Stim2)
    stim3_pract.setImage('stimuli/' + Stim3)
    # setup some python lists for storing info about the mouse_pract
    mouse_pract.x = []
    mouse_pract.y = []
    mouse_pract.leftButton = []
    mouse_pract.midButton = []
    mouse_pract.rightButton = []
    mouse_pract.time = []
    mouse_pract.clicked_name = []
    gotValidClick = False  # until a click is received
    # Run 'Begin Routine' code from code_pract
    # Store timeline information
    current_trial_type = "practice_trial" # Change as you wish
    current_event = "stimulus_presentation" # Change as you wish
    current_rt = ""
    current_time_elapsed = global_timer.getTime()-ref_time
    
    counter = addTrialInfo(current_trial_type, 
        current_event, 
        current_rt,
        current_time_elapsed,
        counter)
    # Go to next row to prevent overwriting information.
    thisExp.nextEntry()
    # keep track of which components have finished
    practiceComponents = [fixation_practice, frame1_pract, frame2_pract, frame3_pract, stim1_pract, stim2_pract, stim3_pract, mouse_pract, question_text_pract]
    for thisComponent in practiceComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "practice" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *fixation_practice* updates
        if fixation_practice.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            fixation_practice.frameNStart = frameN  # exact frame index
            fixation_practice.tStart = t  # local t and not account for scr refresh
            fixation_practice.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(fixation_practice, 'tStartRefresh')  # time at next scr refresh
            fixation_practice.setAutoDraw(True)
        if fixation_practice.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > fixation_practice.tStartRefresh + 0.5-frameTolerance:
                # keep track of stop time/frame for later
                fixation_practice.tStop = t  # not accounting for scr refresh
                fixation_practice.frameNStop = frameN  # exact frame index
                fixation_practice.setAutoDraw(False)
        
        # *frame1_pract* updates
        if frame1_pract.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            frame1_pract.frameNStart = frameN  # exact frame index
            frame1_pract.tStart = t  # local t and not account for scr refresh
            frame1_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(frame1_pract, 'tStartRefresh')  # time at next scr refresh
            frame1_pract.setAutoDraw(True)
        if frame1_pract.status == STARTED:  # only update if drawing
            frame1_pract.setOpacity(0.0, log=False)
        
        # *frame2_pract* updates
        if frame2_pract.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            frame2_pract.frameNStart = frameN  # exact frame index
            frame2_pract.tStart = t  # local t and not account for scr refresh
            frame2_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(frame2_pract, 'tStartRefresh')  # time at next scr refresh
            frame2_pract.setAutoDraw(True)
        if frame2_pract.status == STARTED:  # only update if drawing
            frame2_pract.setOpacity(0.0, log=False)
        
        # *frame3_pract* updates
        if frame3_pract.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            frame3_pract.frameNStart = frameN  # exact frame index
            frame3_pract.tStart = t  # local t and not account for scr refresh
            frame3_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(frame3_pract, 'tStartRefresh')  # time at next scr refresh
            frame3_pract.setAutoDraw(True)
        if frame3_pract.status == STARTED:  # only update if drawing
            frame3_pract.setOpacity(0.0, log=False)
        
        # *stim1_pract* updates
        if stim1_pract.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            stim1_pract.frameNStart = frameN  # exact frame index
            stim1_pract.tStart = t  # local t and not account for scr refresh
            stim1_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(stim1_pract, 'tStartRefresh')  # time at next scr refresh
            stim1_pract.setAutoDraw(True)
        
        # *stim2_pract* updates
        if stim2_pract.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            stim2_pract.frameNStart = frameN  # exact frame index
            stim2_pract.tStart = t  # local t and not account for scr refresh
            stim2_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(stim2_pract, 'tStartRefresh')  # time at next scr refresh
            stim2_pract.setAutoDraw(True)
        
        # *stim3_pract* updates
        if stim3_pract.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            stim3_pract.frameNStart = frameN  # exact frame index
            stim3_pract.tStart = t  # local t and not account for scr refresh
            stim3_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(stim3_pract, 'tStartRefresh')  # time at next scr refresh
            stim3_pract.setAutoDraw(True)
        # *mouse_pract* updates
        if mouse_pract.status == NOT_STARTED and t >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            mouse_pract.frameNStart = frameN  # exact frame index
            mouse_pract.tStart = t  # local t and not account for scr refresh
            mouse_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(mouse_pract, 'tStartRefresh')  # time at next scr refresh
            mouse_pract.status = STARTED
            mouse_pract.mouseClock.reset()
            prevButtonState = mouse_pract.getPressed()  # if button is down already this ISN'T a new click
        if mouse_pract.status == STARTED:  # only update if started and not finished!
            buttons = mouse_pract.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    try:
                        iter([stim1_pract, stim2_pract, stim3_pract])
                        clickableList = [stim1_pract, stim2_pract, stim3_pract]
                    except:
                        clickableList = [[stim1_pract, stim2_pract, stim3_pract]]
                    for obj in clickableList:
                        if obj.contains(mouse_pract):
                            gotValidClick = True
                            mouse_pract.clicked_name.append(obj.name)
                    if gotValidClick:
                        x, y = mouse_pract.getPos()
                        mouse_pract.x.append(x)
                        mouse_pract.y.append(y)
                        buttons = mouse_pract.getPressed()
                        mouse_pract.leftButton.append(buttons[0])
                        mouse_pract.midButton.append(buttons[1])
                        mouse_pract.rightButton.append(buttons[2])
                        mouse_pract.time.append(mouse_pract.mouseClock.getTime())
                    if gotValidClick:
                        continueRoutine = False  # abort routine on response
        
        # *question_text_pract* updates
        if question_text_pract.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            question_text_pract.frameNStart = frameN  # exact frame index
            question_text_pract.tStart = t  # local t and not account for scr refresh
            question_text_pract.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(question_text_pract, 'tStartRefresh')  # time at next scr refresh
            question_text_pract.setAutoDraw(True)
        # Run 'Each Frame' code from code_pract
        # If mouse cursor hovers over any stimulus, present square frame.
        # Otherwise, hide it
        if mouseOnStim(stim1_pract, mouse_pract):
            frame1_pract.opacity = 1
        else:
            frame1_pract.opacity = 0
            
        if mouseOnStim(stim2_pract, mouse_pract):
            frame2_pract.opacity = 1
        else:
            frame2_pract.opacity = 0
            
        if mouseOnStim(stim3_pract, mouse_pract):
            frame3_pract.opacity = 1
        else:
            frame3_pract.opacity = 0
        
        # Log response if a valid click was received    
        if gotValidClick:
            # Get time elapsed since start exp.
            current_time_elapsed = global_timer.getTime()-ref_time
            # Log response
            counter = logClickResponse(mouse_pract, 
                current_trial_type, 
                practiceTrials.thisN+1, 
                current_time_elapsed,
                counter)
            
        # Stop routine after n trials  
        if practiceTrials.thisN == (nPractice-1):
            practiceTrials.finished = True
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in practiceComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "practice" ---
    for thisComponent in practiceComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # store data for practiceTrials (TrialHandler)
    practiceTrials.addData('mouse_pract.x', mouse_pract.x)
    practiceTrials.addData('mouse_pract.y', mouse_pract.y)
    practiceTrials.addData('mouse_pract.leftButton', mouse_pract.leftButton)
    practiceTrials.addData('mouse_pract.midButton', mouse_pract.midButton)
    practiceTrials.addData('mouse_pract.rightButton', mouse_pract.rightButton)
    practiceTrials.addData('mouse_pract.time', mouse_pract.time)
    practiceTrials.addData('mouse_pract.clicked_name', mouse_pract.clicked_name)
    # the Routine "practice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'practiceTrials'

# get names of stimulus parameters
if practiceTrials.trialList in ([], [None], None):
    params = []
else:
    params = practiceTrials.trialList[0].keys()
# save data for this loop
practiceTrials.saveAsText(filename + 'practiceTrials.csv', delim=',',
    stimOut=params,
    dataOut=['n','all_mean','all_std', 'all_raw'])

# --- Prepare to start Routine "pause" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_pause.keys = []
key_pause.rt = []
_key_pause_allKeys = []
# Run 'Begin Routine' code from code_pause
# Store timeline information
current_trial_type = "pause_trial"
current_event = "show_screen"
current_rt = ""
current_time_elapsed = global_timer.getTime()-ref_time

counter = addTrialInfo(current_trial_type, 
    current_event, 
    current_rt,
    current_time_elapsed,
    counter)
# To prevent info in same routine to overwrite previous info 
thisExp.nextEntry()
# keep track of which components have finished
pauseComponents = [pause_text, key_pause]
for thisComponent in pauseComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "pause" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *pause_text* updates
    if pause_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        pause_text.frameNStart = frameN  # exact frame index
        pause_text.tStart = t  # local t and not account for scr refresh
        pause_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(pause_text, 'tStartRefresh')  # time at next scr refresh
        pause_text.setAutoDraw(True)
    
    # *key_pause* updates
    waitOnFlip = False
    if key_pause.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        key_pause.frameNStart = frameN  # exact frame index
        key_pause.tStart = t  # local t and not account for scr refresh
        key_pause.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_pause, 'tStartRefresh')  # time at next scr refresh
        key_pause.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_pause.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_pause.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_pause.status == STARTED and not waitOnFlip:
        theseKeys = key_pause.getKeys(keyList=['space'], waitRelease=False)
        _key_pause_allKeys.extend(theseKeys)
        if len(_key_pause_allKeys):
            key_pause.keys = _key_pause_allKeys[-1].name  # just the last key pressed
            key_pause.rt = _key_pause_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    # Run 'Each Frame' code from code_pause
    pressed = False # Flag to prevent multiple logs
    
    # Checks for keypresses (only valid ones are allowed)
    # Logs keypress to the datafile when pressed
    if len(key_pause.keys) > 0 and not pressed:
        # Store timeline information
        current_event = "keypress"
        current_rt = key_pause.rt
        current_time_elapsed = global_timer.getTime()-ref_time
    
        counter = addTrialInfo(current_trial_type, 
            current_event, 
            current_rt,
            current_time_elapsed,
            counter)
        pressed = True
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in pauseComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "pause" ---
for thisComponent in pauseComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_pause.keys in ['', [], None]:  # No response was made
    key_pause.keys = None
thisExp.addData('key_pause.keys',key_pause.keys)
if key_pause.keys != None:  # we had a response
    thisExp.addData('key_pause.rt', key_pause.rt)
thisExp.nextEntry()
# the Routine "pause" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# set up handler to look after randomisation of conditions etc
mainTrials = data.TrialHandler(nReps=1.0, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('datasets/triplets.csv', selection=subset_text),
    seed=None, name='mainTrials')
thisExp.addLoop(mainTrials)  # add the loop to the experiment
thisMainTrial = mainTrials.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisMainTrial.rgb)
if thisMainTrial != None:
    for paramName in thisMainTrial:
        exec('{} = thisMainTrial[paramName]'.format(paramName))

for thisMainTrial in mainTrials:
    currentLoop = mainTrials
    # abbreviate parameter names if possible (e.g. rgb = thisMainTrial.rgb)
    if thisMainTrial != None:
        for paramName in thisMainTrial:
            exec('{} = thisMainTrial[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "main_exp" ---
    continueRoutine = True
    routineForceEnded = False
    # update component parameters for each repeat
    stim1_main.setImage('stimuli/' + Stim1)
    stim2_main.setImage('stimuli/' + Stim2)
    stim3_main.setImage('stimuli/' + Stim3)
    # setup some python lists for storing info about the mouse_main
    mouse_main.x = []
    mouse_main.y = []
    mouse_main.leftButton = []
    mouse_main.midButton = []
    mouse_main.rightButton = []
    mouse_main.time = []
    mouse_main.clicked_name = []
    gotValidClick = False  # until a click is received
    # Run 'Begin Routine' code from code_main
    # Store timeline information
    current_trial_type = "main_trial"
    current_event = "stimulus_presentation"
    current_rt = ""
    current_time_elapsed = global_timer.getTime()-ref_time
    
    counter = addTrialInfo(current_trial_type, 
        current_event, 
        current_rt,
        current_time_elapsed,
        counter)
    # Go to next row to prevent overwriting information.
    thisExp.nextEntry()
    # keep track of which components have finished
    main_expComponents = [fixation_main, frame1_main, frame2_main, frame3_main, stim1_main, stim2_main, stim3_main, mouse_main, question_text_main]
    for thisComponent in main_expComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "main_exp" ---
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *fixation_main* updates
        if fixation_main.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            fixation_main.frameNStart = frameN  # exact frame index
            fixation_main.tStart = t  # local t and not account for scr refresh
            fixation_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(fixation_main, 'tStartRefresh')  # time at next scr refresh
            fixation_main.setAutoDraw(True)
        if fixation_main.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > fixation_main.tStartRefresh + 0.5-frameTolerance:
                # keep track of stop time/frame for later
                fixation_main.tStop = t  # not accounting for scr refresh
                fixation_main.frameNStop = frameN  # exact frame index
                fixation_main.setAutoDraw(False)
        
        # *frame1_main* updates
        if frame1_main.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            frame1_main.frameNStart = frameN  # exact frame index
            frame1_main.tStart = t  # local t and not account for scr refresh
            frame1_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(frame1_main, 'tStartRefresh')  # time at next scr refresh
            frame1_main.setAutoDraw(True)
        if frame1_main.status == STARTED:  # only update if drawing
            frame1_main.setOpacity(0.0, log=False)
        
        # *frame2_main* updates
        if frame2_main.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            frame2_main.frameNStart = frameN  # exact frame index
            frame2_main.tStart = t  # local t and not account for scr refresh
            frame2_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(frame2_main, 'tStartRefresh')  # time at next scr refresh
            frame2_main.setAutoDraw(True)
        if frame2_main.status == STARTED:  # only update if drawing
            frame2_main.setOpacity(0.0, log=False)
        
        # *frame3_main* updates
        if frame3_main.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            frame3_main.frameNStart = frameN  # exact frame index
            frame3_main.tStart = t  # local t and not account for scr refresh
            frame3_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(frame3_main, 'tStartRefresh')  # time at next scr refresh
            frame3_main.setAutoDraw(True)
        if frame3_main.status == STARTED:  # only update if drawing
            frame3_main.setOpacity(0.0, log=False)
        
        # *stim1_main* updates
        if stim1_main.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            stim1_main.frameNStart = frameN  # exact frame index
            stim1_main.tStart = t  # local t and not account for scr refresh
            stim1_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(stim1_main, 'tStartRefresh')  # time at next scr refresh
            stim1_main.setAutoDraw(True)
        
        # *stim2_main* updates
        if stim2_main.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            stim2_main.frameNStart = frameN  # exact frame index
            stim2_main.tStart = t  # local t and not account for scr refresh
            stim2_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(stim2_main, 'tStartRefresh')  # time at next scr refresh
            stim2_main.setAutoDraw(True)
        
        # *stim3_main* updates
        if stim3_main.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            stim3_main.frameNStart = frameN  # exact frame index
            stim3_main.tStart = t  # local t and not account for scr refresh
            stim3_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(stim3_main, 'tStartRefresh')  # time at next scr refresh
            stim3_main.setAutoDraw(True)
        # *mouse_main* updates
        if mouse_main.status == NOT_STARTED and t >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            mouse_main.frameNStart = frameN  # exact frame index
            mouse_main.tStart = t  # local t and not account for scr refresh
            mouse_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(mouse_main, 'tStartRefresh')  # time at next scr refresh
            mouse_main.status = STARTED
            mouse_main.mouseClock.reset()
            prevButtonState = mouse_main.getPressed()  # if button is down already this ISN'T a new click
        if mouse_main.status == STARTED:  # only update if started and not finished!
            buttons = mouse_main.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    try:
                        iter([stim1_main, stim2_main, stim3_main])
                        clickableList = [stim1_main, stim2_main, stim3_main]
                    except:
                        clickableList = [[stim1_main, stim2_main, stim3_main]]
                    for obj in clickableList:
                        if obj.contains(mouse_main):
                            gotValidClick = True
                            mouse_main.clicked_name.append(obj.name)
                    if gotValidClick:
                        x, y = mouse_main.getPos()
                        mouse_main.x.append(x)
                        mouse_main.y.append(y)
                        buttons = mouse_main.getPressed()
                        mouse_main.leftButton.append(buttons[0])
                        mouse_main.midButton.append(buttons[1])
                        mouse_main.rightButton.append(buttons[2])
                        mouse_main.time.append(mouse_main.mouseClock.getTime())
                    if gotValidClick:
                        continueRoutine = False  # abort routine on response
        
        # *question_text_main* updates
        if question_text_main.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
            # keep track of start time/frame for later
            question_text_main.frameNStart = frameN  # exact frame index
            question_text_main.tStart = t  # local t and not account for scr refresh
            question_text_main.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(question_text_main, 'tStartRefresh')  # time at next scr refresh
            question_text_main.setAutoDraw(True)
        # Run 'Each Frame' code from code_main
        # If mouse cursor hovers over any stimulus, present square frame.
        # Otherwise, hide it
        if mouseOnStim(stim1_main, mouse_main):
            frame1_main.opacity = 1
        else:
            frame1_main.opacity = 0
            
        if mouseOnStim(stim2_main, mouse_main):
            frame2_main.opacity = 1
        else:
            frame2_main.opacity = 0
            
        if mouseOnStim(stim3_main, mouse_main):
            frame3_main.opacity = 1
        else:
            frame3_main.opacity = 0
            
        # Log response if a valid click was received    
        if gotValidClick:
            # Get time elapsed since start exp.
            current_time_elapsed = global_timer.getTime()-ref_time
            # Log response
            counter = logClickResponse(mouse_main, 
                current_trial_type, 
                mainTrials.thisN+1, 
                current_time_elapsed,
                counter)
            
        # Stop routine after nMain trials  
        if mainTrials.thisN == (nMain-1):
            mainTrials.finished = True
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in main_expComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "main_exp" ---
    for thisComponent in main_expComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # store data for mainTrials (TrialHandler)
    mainTrials.addData('mouse_main.x', mouse_main.x)
    mainTrials.addData('mouse_main.y', mouse_main.y)
    mainTrials.addData('mouse_main.leftButton', mouse_main.leftButton)
    mainTrials.addData('mouse_main.midButton', mouse_main.midButton)
    mainTrials.addData('mouse_main.rightButton', mouse_main.rightButton)
    mainTrials.addData('mouse_main.time', mouse_main.time)
    mainTrials.addData('mouse_main.clicked_name', mouse_main.clicked_name)
    # the Routine "main_exp" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 1.0 repeats of 'mainTrials'

# get names of stimulus parameters
if mainTrials.trialList in ([], [None], None):
    params = []
else:
    params = mainTrials.trialList[0].keys()
# save data for this loop
mainTrials.saveAsText(filename + 'mainTrials.csv', delim=',',
    stimOut=params,
    dataOut=['n','all_mean','all_std', 'all_raw'])

# --- Prepare to start Routine "exit" ---
continueRoutine = True
routineForceEnded = False
# update component parameters for each repeat
key_exit.keys = []
key_exit.rt = []
_key_exit_allKeys = []
# Run 'Begin Routine' code from code_exit
# Store timeline information
current_trial_type = "exit_trial"
current_event = "show_screen"
current_rt = ""
current_time_elapsed = global_timer.getTime()-ref_time

counter = addTrialInfo(current_trial_type, 
    current_event, 
    current_rt,
    current_time_elapsed,
    counter)
# To prevent info in same routine to overwrite previous info  
thisExp.nextEntry()
# keep track of which components have finished
exitComponents = [exit_text, key_exit]
for thisComponent in exitComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "exit" ---
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *exit_text* updates
    if exit_text.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        exit_text.frameNStart = frameN  # exact frame index
        exit_text.tStart = t  # local t and not account for scr refresh
        exit_text.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(exit_text, 'tStartRefresh')  # time at next scr refresh
        exit_text.setAutoDraw(True)
    
    # *key_exit* updates
    waitOnFlip = False
    if key_exit.status == NOT_STARTED and tThisFlip >= 0.5-frameTolerance:
        # keep track of start time/frame for later
        key_exit.frameNStart = frameN  # exact frame index
        key_exit.tStart = t  # local t and not account for scr refresh
        key_exit.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(key_exit, 'tStartRefresh')  # time at next scr refresh
        key_exit.status = STARTED
        # keyboard checking is just starting
        waitOnFlip = True
        win.callOnFlip(key_exit.clock.reset)  # t=0 on next screen flip
        win.callOnFlip(key_exit.clearEvents, eventType='keyboard')  # clear events on next screen flip
    if key_exit.status == STARTED and not waitOnFlip:
        theseKeys = key_exit.getKeys(keyList=['space'], waitRelease=False)
        _key_exit_allKeys.extend(theseKeys)
        if len(_key_exit_allKeys):
            key_exit.keys = _key_exit_allKeys[-1].name  # just the last key pressed
            key_exit.rt = _key_exit_allKeys[-1].rt
            # a response ends the routine
            continueRoutine = False
    # Run 'Each Frame' code from code_exit
    pressed = False # Flag to prevent multiple logs
    
    # Checks for keypresses (only valid ones are allowed)
    # Logs keypress to the datafile when pressed
    if len(key_exit.keys) > 0 and not pressed:
        # Store timeline information
        current_event = "keypress"
        current_rt = key_exit.rt
        current_time_elapsed = global_timer.getTime()-ref_time
    
        counter = addTrialInfo(current_trial_type, 
            current_event, 
            current_rt,
            current_time_elapsed,
            counter)
        pressed = True
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in exitComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "exit" ---
for thisComponent in exitComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# check responses
if key_exit.keys in ['', [], None]:  # No response was made
    key_exit.keys = None
thisExp.addData('key_exit.keys',key_exit.keys)
if key_exit.keys != None:  # we had a response
    thisExp.addData('key_exit.rt', key_exit.rt)
thisExp.nextEntry()
# the Routine "exit" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsPickle(filename)
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
