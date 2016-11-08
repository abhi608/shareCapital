#!/bin/bash
multichaind chain251@192.168.0.105:2655 | while read c1 c2 c3 c4 c5
do
	if [ "$c3" = "grant" ]; then
		if [ "$c5" = "connect" ]; then
			echo "$c4"
		fi
	fi
done
