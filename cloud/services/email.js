import Parse from 'parse/node';
import settings from '../../settings';

import { AppCache } from 'parse-server/lib/cache';

/**
 * Sends a custom test email.
 * @param
 */
export function sendTest(user, done) {
  const adapter = AppCache.get(settings.appId)['userController']['adapter'];
  if (typeof adapter === 'undefined') {
    done(new Error('Invalid mail adapter.'));
    return;
  }
  adapter.send({
    templateName: 'testEmail',
    subject: 'Test Email',
    fromAddress: 'NoReply <noreply@supercoolapp.io>',
    recipient: user.get('username'),
    variables: { username: user.get('username') },
  })
  .then(
    function(body) {
      done(null, body);
    }
  ).catch(
    function(err) {
      done(err);
    }
  );
}
