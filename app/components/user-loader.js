import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { timeout } from 'ember-concurrency';
import { use, Resource } from 'ember-could-get-used-to-this';

class FetchUser extends Resource {
  @tracked data = null;
  @tracked isLoading = true;
  @tracked isError = false;

  get value() {
    return {
      isLoading: this.isLoading,
      isError: this.isError,
      data: this.data,
    };
  }

  async setup() {
    console.log('setup', this.args.named.id);

    try {
      await timeout(2000);
      this.data = { id: this.args.named.id, name: "Alex" };
      this.isLoading = false;
    } catch (error) {
      this.isLoading = false;
      this.isError = true;
      this.data = error;
    }
  }

  teardown() {
    console.log('teardown', this.args.named.id);
  }
}


export default class UserLoaderComponent extends Component {
  @tracked id = 1;

  @use user = new FetchUser(() => {
    return { named: { id: this.id }, };
  });

  @action
  increment() {
    this.id++;
  }
}
