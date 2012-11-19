---
layout: blog_entry
title: Show Hidden Files on your Mac
tags:
- tips
- mac

---


Just a reminder for myself.

Launch the Terminal and enter these commands exactly as shown.

### Show hidden files

<code>defaults write com.apple.Finder AppleShowAllFiles TRUE</code>	<br>
<code>killall Finder</code>


### Hide hidden files

<code>defaults write com.apple.Finder AppleShowAllFiles FALSE</code><br>
<code>killall Finder</code>

… and that’s about it.

#### Show Hidden Files in a Mac Save Dialogue

You can quickly show all hidden files in any Mac OS X save dialogue box by hitting Command+Shift+Period.

#### Show Hidden Files on your Mac through the Terminal

Another way to quickly see hidden files is by using the “ls” command within the Terminal:

<code>ls -a</code>

The -a flag tells the ls (list) command to show all contents, including hidden files. You then just have to specify a directory if you want to see the hidden files in it:

<code>ls -a ~/Sites/betasite</code>

This method does not effect the Finder or the visibility of hidden files outside of using the -a flag.



