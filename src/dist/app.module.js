"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var database_module_1 = require("./core/database/database.module");
var users_module_1 = require("./modules/users/users.module");
var auth_module_1 = require("./modules/auth/auth.module");
var posts_module_1 = require("./modules/posts/posts.module");
var jobs_module_1 = require("./modules/jobs/jobs.module");
var offers_module_1 = require("./modules/offers/offers.module");
var chat_module_1 = require("./modules/chat/chat.module");
var orders_module_1 = require("./modules/orders/orders.module");
var user_activites_module_1 = require("./modules/user-activites/user-activites.module");
var user_job_interest_module_1 = require("./modules/user-job-interest/user-job-interest.module");
var activites_module_1 = require("./modules/activites/activites.module");
var nestjs_stripe_1 = require("nestjs-stripe");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                nestjs_stripe_1.StripeModule.forRoot({
                    apiKey: process.env.STRIPE_SECRET_KEY,
                    apiVersion: '2020-08-27'
                }),
                database_module_1.DatabaseModule,
                users_module_1.UsersModule,
                auth_module_1.AuthModule,
                posts_module_1.PostsModule,
                jobs_module_1.JobsModule,
                user_activites_module_1.UserActivitesModule,
                user_job_interest_module_1.UserJobInterestModule,
                activites_module_1.ActivitesModule,
                orders_module_1.OrdersModule,
                offers_module_1.OffersModule,
                chat_module_1.ChatModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
