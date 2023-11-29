class Local {
  get Authorization() {
    return localStorage.getItem('Authorization');
  }
}

export default new Local