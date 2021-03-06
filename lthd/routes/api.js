/**
 * Created by quang on 11/28/2016.
 */
var constants = require('../config/constants');
var helper = require("../config/helper");
var connection = require('../config/sqlConnection');

module.exports = function (router, passport) {
    //rut chich thong tin
    router.get('/crawler', function (req, res) {
        var crawler = require("../models/crawler");
        crawler.get(res);
    });

    router.get('/topcomment', function (req, res) {
        var comment = require("../models/comment");
        comment.getTopComment(res);
    });

    router.get('/toppost', function (req, res) {
        var post = require("../models/post");
        post.getTopPost(res);
    });

    router.use(passport.authenticate(['bearer'], {session: false}));

    router.get('/', function (req, res) {
        var authorization = req.headers.authorization;
        var profile = helper.decoded_token(authorization);
        var data = {};
        data.profile = profile;
        res.status(200).jsonp(data);
    });

    // newfeed
    router.post('/newfeed/', function (req, res) {
        var newfeed = require("../models/post");
        newfeed.insert(req, res);
    });

    router.get('/newfeed/totalpost/', function (req, res) {
        var newfeed = require("../models/post");
        newfeed.totalpost(req, res);
    });

    router.get('/newfeed/?:page', function (req, res) {
        var newfeed = require("../models/post");
        newfeed.getNewData(req, res);
    });

    router.get('/newfeed/comment/:post_id', function (req, res) {
        var comment = require("../models/comment");
        var post_id = req.params.post_id;
        comment.getCommentByPostId(post_id, res);
    });

    router.get('/newfeed/photos/:page', function (req, res) {
        var newfeed = require("../models/post");
        newfeed.photos(req, res);
    });

    // profile
    router.get('/profile', function (req, res) {
        var authorization = req.headers.authorization;
        var decoded = helper.decoded_token(authorization);
        res.status(200).json(decoded);
    });

    //comment
    router.post('/comment', function (req, res) {
        var comment = require("../models/comment");
        comment.insert(req, res);
    });

    router.get('/comment/totalpost', function (req, res) {
        var newfeed = require("../models/comment");
        newfeed.totalpost(req, res);
    });

    router.get('/comment/:post_id', function (req, res) {
        var comment = require("../models/comment");
        var post_id = req.params.post_id;
        comment.getCommentByPostId(post_id, res);
    });

    router.delete('/comment/:id', function (req, res) {
        var comment = require("../models/comment");
        var id = req.params.id;
        comment.del(id, res);
    });
//    notication
    router.get('/notification', function (req, res) {
        var notification = require("../models/notification");
        notification.get(req, res);
    });

    router.get('/notification/count', function (req, res) {
        var notification = require("../models/notification");
        notification.count(req, res);
    });

    router.put('/notification', function (req, res) {
        var notification = require("../models/notification");
        notification.seem(req, res);
    });

    router.post('/notification', function (req, res) {
        var notification = require("../models/notification");
        notification.insert(req, res);
    });
//    chat
    router.get('/chat', function (req, res) {
        var chat = require("../models/chat");
        chat.getChat(req, res);
    });
}