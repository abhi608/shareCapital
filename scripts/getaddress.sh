#!/bin/bash
multichain-cli chain333 getaddresses | grep "^[^\{]" | grep "\".*\""
