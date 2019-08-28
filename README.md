# discourse-rebus-theme

## Info from Jay for restore:

I went in and changed SiteSetting.content_security_policy=false

And I *think* that's fixed it. The bummer is that you'll need to do this every time you do a restore, like this:

cd /var/discourse
./launcher enter app
rails c
SiteSetting.content_security_policy=false

You might be able to add some stuff to SiteSetting.content_security_policy_script_srcs and allow whatever the holdup is (looks like mailchimp?). I'm just not clear why it's working on your current site.

Maybe also 

./launcher enter app
discourse remap talk.foo.com talk.bar.com
rake posts:rebake

as described https://meta.discourse.org/t/change-the-domain-name-or-rename-my-discourse/16098
