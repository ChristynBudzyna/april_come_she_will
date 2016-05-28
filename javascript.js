$(document).ready(function() {
    setup();

    $("#winter-button").click(function() {
        $("#spring-lyric-box").hide();
        $("#summer-lyric-box").hide();
        $("#fall-lyric-box").hide();
        $("#winter-lyric-box").show();
    })

    $("#spring-button").click(function() {
        $("#winter-lyric-box").hide();
        $("#summer-lyric-box").hide();
        $("#fall-lyric-box").hide();
        $("#spring-lyric-box").show();
    })

    $("#summer-button").click(function() {
        $("#winter-lyric-box").hide();
        $("#spring-lyric-box").hide();
        $("#fall-lyric-box").hide();
        $("#summer-lyric-box").show();
    })

    $("#fall-button").click(function() {
        $("#winter-lyric-box").hide();
        $("#spring-lyric-box").hide();
        $("#summer-lyric-box").hide();
        $("#fall-lyric-box").show();
    })
})


var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

var transforms = ["transform",
                  "msTransform",
                  "webkitTransform",
                  "mozTransform",
                  "oTransform"];

var transformProperty = getSupportedPropertyName(transforms);

var fallingObjects = [];
var browserWidth;
var browserHeight;
var numberOfFallingObjects = 100;
var resetPosition = false;

function setup() {
    window.addEventListener("DOMContentLoaded", generateFallingObjects, false);
    window.addEventListener("resize", setResetFlag, false);
}

function getSupportedPropertyName(properties) {
    for (var i = 0; i < properties.length; i++) {
        if (typeof document.body.style[properties[i]] != "undefined") {
            return properties[i];
        }
    }
    return null;
}


function FallingObject(element, speed, xPos, yPos) {
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;
    this.element.style.opacity = .1 + Math.random();
}


FallingObject.prototype.update = function () {
    this.counter += this.speed / 3000;
    this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
    this.yPos += Math.sin(this.counter) / 40 + this.speed / 30;

    setTranslate3DTransform(this.element, Math.round(this.xPos), Math.round(this.yPos));


    if (this.yPos > browserHeight) {
        this.yPos = -50;
    }
}

function setTranslate3DTransform(element, xPosition, yPosition) {
    var val = "translate3d(" + xPosition + "px, " + yPosition + "px" + ", 0)";
    element.style[transformProperty] = val;
}


function generateFallingObjects(element) {

    var originalFallingObject = document.querySelector(".falling-object-img");

    var fallingObjectContainer = originalFallingObject.parentNode;

    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;

    for (var i = 0; i < numberOfFallingObjects; i++) {

        // clone our original snowflake and add it to snowflakeContainer
        var fallingObjectClone = originalFallingObject.cloneNode(true);
        fallingObjectContainer.appendChild(fallingObjectClone);

        // set our snowflake's initial position and related properties
        var initialXPos = getPosition(50, browserWidth);
        var initialYPos = getPosition(50, browserHeight);
        var speed = 5+Math.random()*40;

        // create our Snowflake object
        var fallingObject = new FallingObject(fallingObjectClone,
                                            speed,
                                            initialXPos,
                                            initialYPos);
        fallingObjects.push(fallingObject);
    }
    fallingObjectContainer.removeChild(originalFallingObject);

    moveFallingObjects();
}

function moveFallingObjects() {
    for (var i = 0; i < fallingObjects.length; i++) {
        var fallingObject = fallingObjects[i];
        fallingObject.update();
    }


    if (resetPosition) {
        browserWidth = document.documentElement.clientWidth;
        browserHeight = document.documentElement.clientHeight;

        for (var i = 0; i < fallingObjects.length; i++) {
            var fallingObject = fallingObject[i];

            fallingObject.xPos = getPosition(50, browserWidth);
            fallingObject.yPos = getPosition(50, browserHeight);
        }

        resetPosition = false;
    }

    requestAnimationFrame(moveFallingObjects);
}

function getPosition(offset, size) {
    return Math.round(-1*offset + Math.random() * (size+2*offset));
}

function setResetFlag(e) {
    resetPosition = true;
}