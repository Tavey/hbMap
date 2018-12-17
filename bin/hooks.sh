dir=`pwd`


cat > ../.git/hooks/pre-push.sample << EOF
$dir/publish.sh
EOF
mv ../.git/hooks/pre-push.sample  ../.git/hooks/pre-push
chmod a+x ../.git/hooks/pre-push

