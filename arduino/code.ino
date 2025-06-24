#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>

const char* ssid = "Kunal";
const char* password = "00000000";
const String deviceCode = "ABC";
const String serverUrl = "https://sniffy.onrender.com/alert/alert";

// Pin definitions (safe GPIOs)
const int gasSensorPin     = A0;   // Analog pin
const int flameSensorPin   = D5;   // GPIO14
const int greenLEDPin      = D1;   // GPIO5
const int redLEDPin        = D2;   // GPIO4
const int blueLEDPin       = D6;   // GPIO12 - safer than D3
const int buzzerPin        = D7;   // GPIO13 - safer than D4
const int buttonPin = D3; // use GPIO0 instead of D8

const int gasThreshold     = 630;
const int flameDetected    = LOW;

bool isPaused = false;
unsigned long pauseStartTime = 0;
unsigned long pauseDuration = 20UL * 60UL * 1000UL;

void setup() {
  Serial.begin(115200);
  Serial.println("ESP Booted...");

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected!");

  pinMode(gasSensorPin, INPUT);
  pinMode(flameSensorPin, INPUT);
  pinMode(greenLEDPin, OUTPUT);
  pinMode(redLEDPin, OUTPUT);
  pinMode(blueLEDPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
pinMode(buttonPin, INPUT_PULLUP);

  digitalWrite(greenLEDPin, HIGH);
  digitalWrite(redLEDPin, LOW);
  digitalWrite(blueLEDPin, LOW);
}

void sendAlertToServer(String alertType, String message) {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure();

    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    String body = "{\"deviceCode\":\"" + deviceCode + "\",\"alertType\":\"" + alertType + "\",\"message\":\"" + message + "\"}";
    int httpCode = http.POST(body);

    Serial.println("HTTP code: " + String(httpCode));
    if (httpCode > 0) {
      Serial.println("Response: " + http.getString());
    } else {
      Serial.println("Failed to send alert: " + http.errorToString(httpCode));
    }

    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}

unsigned long lastSensorCheckTime = 0;
const unsigned long sensorCheckInterval = 10000;

void loop() {
  static bool buttonPressedLastLoop = false;
  bool currentButtonState = digitalRead(buttonPin) == LOW;

  if (currentButtonState && !buttonPressedLastLoop && !isPaused) {
    isPaused = true;
    pauseStartTime = millis();
    Serial.println("Cooking mode activated for 20 minutes.");
  }
  buttonPressedLastLoop = currentButtonState;

  if (isPaused && millis() - pauseStartTime >= pauseDuration) {
    isPaused = false;
    Serial.println("Cooking mode expired.");
  }

  if (millis() - lastSensorCheckTime >= sensorCheckInterval) {
    lastSensorCheckTime = millis();

    int gasValue = analogRead(gasSensorPin);
    int flameValue = digitalRead(flameSensorPin);
    Serial.print("Gas: ");
    Serial.print(gasValue);
    Serial.print(" | Flame: ");
    Serial.println(flameValue);

    if (!isPaused) {
      bool gasDetected = gasValue > gasThreshold;
      bool flameDetectedNow = flameValue == flameDetected;

      if (gasDetected || flameDetectedNow) {
        digitalWrite(greenLEDPin, LOW);
        digitalWrite(redLEDPin, gasDetected ? HIGH : LOW);
        digitalWrite(blueLEDPin, flameDetectedNow ? HIGH : LOW);
        tone(buzzerPin, 1000);

        if (gasDetected) sendAlertToServer("Gas", "Gas leak detected 🚨");
        if (flameDetectedNow) sendAlertToServer("Flame", "Flame detected 🔥");
      } else {
        digitalWrite(greenLEDPin, HIGH);
        digitalWrite(redLEDPin, LOW);
        digitalWrite(blueLEDPin, LOW);
        noTone(buzzerPin);
        sendAlertToServer("Normal", "All conditions normal ✅");
      }
    } else {
      digitalWrite(greenLEDPin, HIGH);
      digitalWrite(redLEDPin, LOW);
      digitalWrite(blueLEDPin, LOW);
      noTone(buzzerPin);
    }
  }
}
