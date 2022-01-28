#!/bin/sh
CURRENTPATH=$(cd `dirname $0`; pwd)
cd $CURRENTPATH

cd ..

node ./pack/publish.js