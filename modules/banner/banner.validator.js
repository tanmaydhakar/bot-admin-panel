const path = require('path');
const db = require(path.resolve('./models/index'));
const Banner = db.Banner;
const { body, param, validationResult } = require('express-validator');