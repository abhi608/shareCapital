#!/bin/bash
multichaind chain101@192.168.0.108:7727 | while read c1 c2 c3 c4 c5
do
	if [ "$c3" = "grant" ]; then
		if [ "$c5" = "connect" ]; then
			echo "$c4"
		fi
	fi
done
