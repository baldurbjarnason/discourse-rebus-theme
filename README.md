# discourse-rebus-theme

## Info from Jay for restore:

I went in and changed SiteSetting.content_security_policy=false

And I *think* that's fixed it. The bummer is that you'll need to do this every time you do a restore, like this:

You will require the Discourse password, and your user will be plain old 'root'
```terminal
> cd /var/discourse
<prompted for root and password>
> ./launcher enter app
> rails c  # wait for the prompt, it's slow and entering something before will fail
[n] pry(main)> SiteSetting.content_security_policy=false
```

*where [n] is some number, to my knowledge it's simply the number of the command, incremented on each command you make*

You might be able to add some stuff to SiteSetting.content_security_policy_script_srcs and allow whatever the holdup is (looks like mailchimp?). I'm just not clear why it's working on your current site.

Maybe also 

./launcher enter app
discourse remap talk.foo.com talk.bar.com
rake posts:rebake

as described https://meta.discourse.org/t/change-the-domain-name-or-rename-my-discourse/16098
