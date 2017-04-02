#!/bin/bash
ADDR="$(bash getaddress.sh | tr -d '"')"
AMT=$1
STR="JPY":${AMT}
echo ${STR}
#multichain-cli chain333 preparelockunspentfrom ${ADDR} '{"JPY":${AMT}'
