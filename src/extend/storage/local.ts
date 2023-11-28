class Local {
  #user = {
    id: 0,
    nickname: '堪笑',
  }

  get accessToken() {
    return 'abc'
  }

  get logged() {
    return this.accessToken.length > 0;
  }

  get user() {
    return {
      ...this.#user
    }
  }
}

export default new Local()