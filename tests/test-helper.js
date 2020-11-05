import Application from 'ember-use-it/app';
import config from 'ember-use-it/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
