async function Logoff(res) {
  res.clearCookie('Token');
  res.redirect('/');
}

module.exports = Logoff;