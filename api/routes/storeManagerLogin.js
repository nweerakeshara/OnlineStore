const express = require('express');
const router = express.Router();
const {User} = require('../model/storemanager.model');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');