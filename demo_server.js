const http = require('http');
const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

console.log(`env loaded: ${process.env.STARTED}`);

console.log('Запуск на компьютере:', os.hostname());
