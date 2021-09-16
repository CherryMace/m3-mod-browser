// ==UserScript==
// @name		A Touch of Mastery Achievement Patch
// @version		1.0.0
// @description	Correctly allows for the unlocking of the 'A Touch of Mastery' achievement
// @author		Buttchouda
// @match		https://*.melvoridle.com/*
// @exclude		https://wiki.melvoridle.com*
// ==/UserScript==

const defaultCheckForSteamAchievements = checkForSteamAchievements;
checkForSteamAchievements = function (...args) {
	defaultCheckForSteamAchievements.apply(defaultCheckForSteamAchievements, args);
	
	const achievementNames = parent.greenworks.getAchievementNames();
	for (let i = 0; i < achievementNames.length; i++) {
		switch (achievementNames[i]) {
			case "NEW_ACHIEVEMENT_1_4":
				if (Object.values(masteryCache).some(m => Object.values(m).includes(99))) {
					unlockSteamAchievement(achievementNames[i], i);
				}
        break;
		}
	}
};
