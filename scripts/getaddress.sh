#!/bin/bash
multichain-cli chain333 getaddresses | grep "^[^\{]" | grep "\".*\"" | tr -d '"' | tr -d '\n'
