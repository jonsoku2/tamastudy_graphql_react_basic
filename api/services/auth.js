const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// SerializeUser는 저장할 수있는 식별 토큰을 제공하는 데 사용됩니다.
// 사용자 세션에서 우리는 전통적으로이를 위해 'ID'를 사용합니다.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 'serializeUser'의 상대방. 사용자의 ID 만 제공하면
// 사용자 객체. 이 객체는 'req.user'에 배치됩니다.
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// 로컬에 저장된 전자 메일을 사용하여 사용자를 인증하는 방법을 Passport에 지시합니다.
// 및 비밀번호 조합. 이 전략은 사용자가 시도 할 때마다 호출됩니다
// 로그인합니다. 먼저 제출 된 이메일과 일치하는 MongoDB에서 사용자 모델을 찾습니다.
// 제공된 비밀번호가 저장된 비밀번호와 일치하는지 확인합니다. 그곳에
// 여기에 명백한 두 가지 실패 점이 있습니다. 이메일이 DB에 없거나
// 비밀번호가 저장된 비밀번호와 일치하지 않을 수 있습니다. 두 경우 모두 '완료'라고합니다
// 인증 프로세스가 실패한 이유를 알려주는 문자열을 포함한 콜백.
//이 문자열은 GraphQL 클라이언트에 다시 제공됩니다.
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, 'Invalid Credentials');
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, 'Invalid credentials.');
      });
    });
  }),
);

// 새로운 사용자 계정을 만듭니다. 먼저 사용자가 이미 존재하는지 확인합니다
// 동일한 이메일 주소로 여러 계정을 만들지 않도록이 이메일 주소
// 그렇지 않은 경우 기존 사용자를 저장합니다. 사용자가 생성되면
// 'req.logIn'함수에 제공됩니다. 이것은 Passport JS와 별개입니다.
// 두 번째 'then'문에서 작성된 약속을 주목하십시오. 이건 끝났어
// Passport는 콜백 만 지원하고 GraphQL은 약속 만 지원하므로
// 비동기 코드! 어색한!
function signup({ username, email, password, req }) {
  const user = new User({ username, email, password });
  if (!email || !password) {
    throw new Error('You must provide an email and password.');
  }

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        throw new Error('Email in use');
      }
      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, err => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
}

// 사용자를 로그인합니다. 이것은 위에서 정의한 '지역 전략'을 호출 할 것입니다.
// 파일. 여기에 이상한 메소드 서명이 있습니다 : 'passport.authenticate'
// 함수는 미들웨어로 사용되도록 지정된 함수를 반환합니다.
// 표현하다. 여기에 또 다른 호환성 레이어가 있습니다.
// GraphQL은 항상 비동기 코드 처리에 대한 약속을 기대하기 때문에 GraphQL.
function login({ email, password, req }) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) {
        reject('Invalid credentials.');
      }

      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };
