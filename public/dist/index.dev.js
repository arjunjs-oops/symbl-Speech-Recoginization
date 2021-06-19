"use strict";

/**
 * The JWT token you get after authenticating with our API.
 * Check the Authentication section of the documentation for more details.
 */
var uniqueMeetingId = 'reasonworld11@gmai';
var accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjQ5MTg1NTEwMTUwNjM1NTIiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiRzl0VTZ0Tmd0YzJUUFBMUmJmRXZSZWN5V3FsOGxjQnhAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjIzOTE1OTA1LCJleHAiOjE2MjQwMDIzMDUsImF6cCI6Ikc5dFU2dE5ndGMyVFBQTFJiZkV2UmVjeVdxbDhsY0J4IiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pXEdzSj_iJr5HNNkbEm9MwRAoinKwJx61WKqFzBsPDlCqWeLEnvOlYYTtv5jglQDH0UiBjqOmH58-Z6t9p4F2ApBnOKs5qmVAyTwHAdaSYds6QYZP0l_HhPogKiK7__F4oN0gMqBh5lbB_6CL0v7ka4Uf2duV5Docwmtk89YmJhhCpmvqbtSBTuJD-qWz54346xgrzztDUKaG6HhJKAMoyIal-WOpSAN8VWRk4DvIq29AWH-ihoi-Fhgx5Dh-1Jw0_yIHPEl1oRHlogVA7CpIhqSn4s4RZ3vnLfZcQV24b0X_TK-oX51aOf_xX3wmY8Z2Wh-lT1qogvfAPLGU5fE2g';
var ws = io();
ws.on('connect', function (e) {
  console.log('client side done');
}); // Fired when a message is received from the WebSocket server

ws.on("symbl-data", function (event) {
  console.log(event); // You can find the conversationId in event.message.data.conversationId;

  var data = JSON.parse(event.data);

  if (data.type === 'message' && data.message.hasOwnProperty('data')) {
    console.log('conversationId', data.message.data.conversationId);
  }

  if (data.type === 'message_response') {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data.messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var message = _step.value;
        console.log('Transcript (more accurate): ', message.payload.content);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  if (data.type === 'topic_response') {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = data.topics[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var topic = _step2.value;
        console.log('Topic detected: ', topic.phrases);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  if (data.type === 'topic_response') {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = data.topics[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _topic = _step3.value;
        console.log('Topic detected: ', _topic.phrases);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  if (data.type === 'insight_response') {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = data.insights[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var insight = _step4.value;
        console.log('Insight detected: ', insight.payload.content);
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
    console.log('Live transcript (less accurate): ', data.message.punctuated.transcript);
  }

  console.log("Response type: ".concat(data.type, ". Object: "), data);
});
ws.on('disconnect', function (msg) {
  console.log("Disconnected SUcessfully");
}); // Fired when the WebSocket closes unexpectedly due to an error or lost connetion
// Fired when the connection succeeds.
// ws.on = ('micdata', event) => {
//     ws.send(JSON.stringify({
//         type: 'start_request',
//         meetingTitle: 'Websockets How-to', // Conversation name
//         insightTypes: ['question', 'action_item'], // Will enable insight generation
//         config: {
//             confidenceThreshold: 0.5,
//             languageCode: 'en-US',
//             speechRecognition: {
//                 encoding: 'LINEAR16',
//                 sampleRateHertz: 44100,
//             }
//         },
//         speaker: {
//             userId: 'example@symbl.ai',
//             name: 'Example Sample',
//         }
//     }));
// };

/**
 * The callback function which fires after a user gives the browser permission to use
 * the computer's microphone. Starts a recording session which sends the audio stream to
 * the WebSocket endpoint for processing.
 */

function startRecording() {
  var _this = this;

  console.log('start recording');
  context = new window.AudioContext();
  ws.emit('start', {
    'sampleRate': context.sampleRate
  });
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false
  }).then(function (stream) {
    localstream = stream;

    var input = _this.context.createMediaStreamSource(stream);

    processor = context.createScriptProcessor(4096, 1, 1);
    input.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function (e) {
      var voice = e.inputBuffer.getChannelData(0);
      console.log(voice.buffer);
      ws.emit('send_pcm', voice.buffer);
    };
  })["catch"](function (e) {
    // "DOMException: Rrequested device not found" will be caught if no mic is available
    console.log(e);
  });
}

function stopRecording() {
  console.log('stop recording');
  processor.disconnect();
  processor.onaudioprocess = null;
  processor = null;
  localstream.getTracks().forEach(function (track) {
    track.stop();
  });
  ws.emit('stop', '', function (res) {
    console.log("Audio data is saved as ".concat(res.filename));
  });
  ws.disconnect();
}

var state;
document.querySelector('.start-recording').addEventListener('click', function _callee(e) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          state = 1;
          startRecording();

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
document.querySelector('.stop-recording').addEventListener('click', function _callee2(e) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (state === 1) stopRecording();

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
});