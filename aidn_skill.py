from __future__ import print_function
import random
import json
import urllib3

http = urllib3.PoolManager()

url = "aidn-web.azurewebsites.net/api/history"
url_help = "aidn-web.azurewebsites.net/api/help_messages"

#url = 'localhost:5000/api/history'

welcome_img = 'https://img.freepik.com/free-vector/illustration-of-healthy-lifestyle_53876-28533.jpg?size=338&ext=jpg'
help_img = 'https://cdn.shopify.com/s/files/1/0194/3447/products/refer_to_instructions_label_c7a08cc5-bfd0-4268-8c7e-6f0e0935be95.png?v=1507145698'
goodbye_img = 'https://media.mnn.com/assets/images/2018/02/cora_corgi.PNG.653x0_q80_crop-smart.png'

list_of_challenges = [
    ['Complete 20 push-ups!', 'https://previews.123rf.com/images/logo3in1/logo3in11609/logo3in1160900004/62275155-step-instruction-for-push-up-of-woman-cartoon-illustration-about-work-out-.jpg'],
    ['Complete 10 squats!', 'https://www.fitstream.com/images/weight-training/exercises/squat-one.png'],
    ['Go for a quick walk!', 'https://s3.envato.com/files/246953810/1920x1080.jpg'],
    ['Get up and stretch with some leg lunges', 'https://cdn-img.health.com/sites/default/files/styles/large_16_9/public/1512670961/carrie-underwood-hot-moves-illustration.jpg?itok=iDs-LOX2&1512671216'],
    ['Complete 3 neck rolls, both ways', 'https://cdn1.dailyhealthpost.com/wp-content/uploads/2017/09/04-NeckRoll.jpg'],
    ['How are your wrists feeling? Do 10 wrist rolls both hands', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM2prn_k4d2J6WlE2S8H2bTXNhBVS2vUQW98l8lE175jOswQIh'],
    ['Up and ready! Do 15 jumping jacks', 'https://img.clipartxtras.com/6f32167532a39488781dd0ea9eddc37e_jumping-jack-clipart-clipground-jumping-jack-clipart_909-1024.jpeg'],
    ['Do a barrel roll!', 'https://i.stack.imgur.com/ZcHgS.png'],
    ['Complete a 30 second wall sit!', 'https://img.clipartxtras.com/3c60e4db1c7a5701de2d6226f79549ef_10-great-exercises-to-do-outdoors-this-summer-wall-sit-drawing_537-821.jpeg'],
    ['Breathe deeply for 15 seconds, in ... ... ...  out ... ... ... in ... ... ... out ... ... ...', 'https://img.clipartxtras.com/594655456ff1c5ff99dbfe0c831c19ce_3-easy-ways-to-breathe-deeply-wikihow-deep-breathing-drawing_728-546.jpeg']
]

list_of_tips = [
    ['Get up and active every hour', 'https://c.tadst.com/gfx/750x500/dst-illustration.png?1'],
    ['Try and reach 10,000 steps a day', 'https://www.ishn.com/ext/resources/Issues/2017/02-February/ISHN0217_C1_pic.jpg?1486065988'],
    ['Drink 8 cups of water a day', 'https://waterandhealth.org/wp-content/uploads/2017/05/acc_pouring_water.jpg'],
    ['Exercise daily, try it with \n -ask doctor to give me a challenge-', 'https://static0.fitbit.com/simple.b-cssdisabled-jpg.h2366b7ba34958d57b0e6cfbbd42686a3.pack?items=%2Fcontent%2Fassets%2Fadventures%2Fimages%2Fgallery%2Fyosemite4.jpg'],
    ['Exercise daily, try it with \n -ask doctor to give me a challenge-', 'https://static1.squarespace.com/static/551954dfe4b0cc9152288892/569f67c8ab2810c1c4ef8d05/569f67c8df40f33e1071ea36/1453462882928/01_DSC4648.jpg?format=2500w'],
    ['Reduce salt and sugar intake', 'https://www.belmarrahealth.com/wp-content/uploads/2017/08/eblast-salt-intake-500x339.jpg'],
    ['Enjoy plenty of fruits and vegetables', 'https://www.heart.org/-/media/aha/h4gm/article-images/how-to-eat-more-fruits-and-veg.jpg?h=800&la=en&w=1200&hash=F662753067CDEBD879359EB35869072B4F1CCFA3'],
    ['Get enough sleep and rest', 'https://healthblog.uofmhealth.org/sites/consumer/files/2017-01/UMH_C_SLEEPHACK%401x.jpg'],
    ['Avoid bright lights before you sleep', 'https://www.telegraph.co.uk/content/dam/women/2016/09/26/phonenight_trans_NvBQzQNjv4BqpJliwavx4coWFCaEkEsb3kvxIt-lGGWCWqwLa_RXJU8.JPG?imwidth=450'],
    ['Have fun and be happy!', 'https://imgc.allpostersimages.com/img/print/posters/brett-wilson-be-happy-and-smile_a-G-13062055-0.jpg']
]

questions = [
    "Yes or no: I'm overweight or obese",
    "Yes or no: I smoke cigarettes",
    "Yes or no: I’ve been recently injured",
    "Yes or no: I have high cholesterol",
    "Yes or no: I have hypertension",
    "Please list your symptoms: ",
    "Have you traveled anywhere in the past 12 months?",
    "Would you like to contact your emergency contacts?"
]

answer = {}

def random_choice():
    return random.randint(0, len(list_of_tips)-1)

def build_speechlet_response(title, output, text, image, reprompt_text, should_end_session):
    return {
        'outputSpeech': {
            'type': 'PlainText',
            'text': output
        },
        'card': {
            'type': 'Standard',
            'title': ""+title,
            'text': ""+text,
            'image': {
                "smallImageUrl": image,
                "largeImageUrl": image
            }
        },
        'reprompt': {
            'outputSpeech': {
                'type': 'PlainText',
                'text': reprompt_text
            }
        },
        'shouldEndSession': should_end_session
    }


def build_response(session_attributes, speechlet_response):
    return {
        'version': '1.0',
        'sessionAttributes': session_attributes,
        'response': speechlet_response
    }


def get_welcome_response():
    session_attributes = {}
    card_title = "Welcome"
    speech_output = "Hello, this is aidn, your virtual medical assistant. " \
                    "What would you like help with today?"
    # If the user either does not reply to the welcome message or says something
    # that is not understood, they will be prompted again with this text.
    reprompt_text = "What would you like help with today? If you need immediate help, please say help. If you want to conduct a check up, please say check up If you want a daily health tip or challenge, please say tip or challenge. For a full list of commands, say commands." 
    should_end_session = False
    return build_response(session_attributes, build_speechlet_response(
        card_title, speech_output, speech_output, welcome_img, reprompt_text, should_end_session))

def set_help():
    card_title = "Welcome"
    speech_output = "Contacting your emergency contacts now."

    http.request('POST', url_help, body = json.dumps({}}),headers = {'Content-Type': 'application/json'}, retries = False)

def handle_session_end_request():
    card_title = "Session Ended"
    speech_output = ". . . Thank you for your time. . ."
    # Setting this to true ends the session and exits the skill.
    should_end_session = True
    return build_response({}, build_speechlet_response(
        card_title, speech_output, speech_output, goodbye_img, None, should_end_session))

def set_challenge():
    choice = random_choice()
    card_title = "Challenge:"
    speech_output = "Let see if you can complete this challenge. . . " + list_of_challenges[choice][0]
    output_text = list_of_challenges[choice][0]
    image = list_of_challenges[choice][1]
    should_end_session = False

    p = {'challenge': str(list_of_challenges[choice][0])}
    http.request('POST', url, body = json.dumps(p),headers = {'Content-Type': 'application/json'}, retries = False) 

    return build_response({}, build_speechlet_response(
        card_title, speech_output, output_text, image, None, should_end_session))

def set_tip():
    choice = random_choice()
    card_title = "Tip:"
    speech_output = "The more you know! " + list_of_tips[choice][0]
    output_text = list_of_tips[choice][0]
    image = list_of_tips[choice][1]
    should_end_session = False

    p = {'tip': str(list_of_tips[choice][0])} 
    http.request('POST', url, body = json.dumps(p),headers = {'Content-Type': 'application/json'}, retries = False) 

    return build_response({}, build_speechlet_response(
        card_title, speech_output, output_text, image, None, should_end_session))

def set_commands():
    instructs = [
        "say 'help' for immediate help,",
        "'check up' for a virtualized check up,",
        "'tip' for a health tip,",
        "'challenge' for a health challenge,",
        "and 'commands' to hear the menu again", 
    ]
    list_of_in = "Here are some sample commands . . . "
    for i in range(len(instructs)):
        list_of_in = list_of_in + instructs[i] + " . . . "

    text = list_of_in.replace(". . .", "\n  -   ").split('\n')
    text_file = ""
    for i in range(len(text)-1):
        text_file = text_file + "\n" + text[i]

    card_title = "Commands:"
    speech_output = list_of_in
    output_text = text_file
    should_end_session = False
    reprompt_text = "Please tell me what you you are looking for or hear the list again by saying commands"
    return build_response({}, build_speechlet_response(
        card_title, speech_output, output_text, help_img, reprompt_text, should_end_session)) 


def set_check_up(session):
    attr = session.get('attributes', {})
    if 'counter' in attr and attr['counter'] < len(questions):
        i = attr['counter']
        card_title = "Question "+str(attr['counter']+1)+":"
        speech_output = questions[i]
        output_text = questions[i]
        should_end_session = False
        return build_response(attr, build_speechlet_response(
            card_title, speech_output, output_text, None, None, should_end_session))
    elif 'counter' in attr and attr['counter'] >= len(questions):
        card_title = "Processing..."
        speech_output = "Thank you for checking in. We will update your profile with this session."
        output_text = "Thank you for checking in. We will update your profile with this session."
        should_end_session = False

        http.request('POST', url, body = json.dumps(answer), headers = {'Content-Type': 'application/json'}, retries = False) 

        return build_response(attr, build_speechlet_response(
            card_title, speech_output, output_text, None, None, should_end_session))
    else:
        attr['counter'] = 0
        i = attr['counter']
        card_title = "Question "+str(attr['counter']+1)+":"
        speech_output = questions[i]
        output_text = questions[i]
        should_end_session = False
        return build_response(attr, build_speechlet_response(
            card_title, speech_output, output_text, None, None, should_end_session))

def yes_intent(session):
    attr = session.get('attributes', {})
    if 'counter' in attr:
        global answer
        answer[questions[attr['counter']]] = 'yes'
        attr['counter'] += 1
    return set_check_up(session)

def no_intent(session):
    attr = session.get('attributes', {})
    if 'counter' in attr:
        global answer
        answer[questions[attr['counter']]] = 'no'
        attr['counter'] += 1
    return set_check_up(session)

def symptom_intent(session, intent):
    attr = session.get('attributes', {})
    if 'counter' in attr:
        attr['counter'] += 1
    return set_check_up(session)

#----- Session -----

def on_session_started(session_started_request, session):
    """ Called when the session starts """

    print("on_session_started requestId=" + session_started_request['requestId']
          + ", sessionId=" + session['sessionId'])


def on_launch(launch_request, session):
    """ Called when the user launches the skill without specifying what they
    want
    """
    print("on_launch requestId=" + launch_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # Dispatch to your skill's launch
    return get_welcome_response()


def on_intent(intent_request, session):
    """ Called when the user specifies an intent for this skill """

    print("on_intent requestId=" + intent_request['requestId'] +
          ", sessionId=" + session['sessionId'])

    intent = intent_request['intent']
    intent_name = intent_request['intent']['name']

    # Dispatch to your skill's intent handlers
    if intent_name == "challenge":
        return set_challenge()
    elif intent_name == "tip":
        return set_tip()
    elif intent_name == "commands":
        return set_commands()
    elif intent_name == "check":
        return set_check_up(session)
    elif intent_name == "symptoms":
        answer['symptoms'] = intent['slots']['symptom']['value']
        return symptom_intent(session, intent_request)
    elif intent_name == "AMAZON.HelpIntent":
        return set_help()
    elif intent_name == "AMAZON.NoIntent":
        return no_intent(session)
    elif intent_name == "AMAZON.YesIntent":
        return yes_intent(session)
    elif intent_name == "AMAZON.CancelIntent" or intent_name == "AMAZON.StopIntent":
        return handle_session_end_request()
    else:
        raise ValueError("Invalid intent")


def on_session_ended(session_ended_request, session):
    """ Called when the user ends the session.

    Is not called when the skill returns should_end_session=true
    """
    print("on_session_ended requestId=" + session_ended_request['requestId'] +
          ", sessionId=" + session['sessionId'])
    # add cleanup logic here

def lambda_handler(event, context):
    """ Route the incoming request based on type (LaunchRequest, IntentRequest,
    etc.) The JSON body of the request is provided in the event parameter.
    """
    print("event.session.application.applicationId=" +
          event['session']['application']['applicationId'])

    if event['session']['new']:
        on_session_started({'requestId': event['request']['requestId']},
                           event['session'])

    if event['request']['type'] == "LaunchRequest":
        return on_launch(event['request'], event['session'])
    elif event['request']['type'] == "IntentRequest":
        return on_intent(event['request'], event['session'])
    elif event['request']['type'] == "SessionEndedRequest":
        return on_session_ended(event['request'], event['session'])

