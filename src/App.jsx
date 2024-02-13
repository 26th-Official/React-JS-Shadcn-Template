import axios from 'axios'
import { createContext, useEffect, useState } from 'react';
import gsap from 'gsap';



import MainComponent from './components/MainComponent'
import LoadingComponent from "./components/LoadingComponent"
import ImageViewerComponent from './components/ImageViewerComponent';
import HomepageComponent from './components/HomepageComponent';
import { CustomCursorComponent, ArtCounterComponent, PageProgressComponent, WhiteScreenComponent } from "./components/AuxComponents"

import UserData from './UserData.json';
import { ContactpageComponent } from './components/Pages/ContactpageComponent';
import GallerypageComponent from './components/Pages/GallerypageComponent';
import OverlayComponent from './components/Overlay/OverlayComponent';

export const DataContext = createContext()

const App = () => {
	const [ArtworkData, setArtworkData] = useState([])


	const [CurrentImage, setCurrentImage] = useState(null)
	const [isImageViewerOpen, setisImageViewerOpen] = useState(false)
	

	const [ScreenSize, setScreenSize] = useState(''); // SM, MD, LG, XL
	const [CameraFov, setCameraFov] = useState(50)
	const [IsDarkMode, setIsDarkMode] = useState(false)
	const [Isloading, setIsloading] = useState(true)
	const [AmbientLightIntensity, setAmbientLightIntensity] = useState(3)

	const [IsContactPageOpen, setIsContactPageOpen] = useState(false)

	useEffect(() => {
		function handleResize() {
			const width = window.innerWidth;
			if (width < 576) {
				setScreenSize('SM');
				setCameraFov(80)
			} else if (width >= 576 && width < 992) {
				setScreenSize('MD');
				setCameraFov(65)
			} else if (width >= 992 && width < 1200) {
				setScreenSize('LG');
				setCameraFov(60)
			} else {
				setScreenSize('XL');
				setCameraFov(50)
			}
		}

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};

	}, []);

	useEffect(() => {
		const CachedImages = JSON.parse(window.sessionStorage.getItem("CachedImages"))
		if (CachedImages === null) {
			window.sessionStorage.setItem("CachedImages", JSON.stringify([]))
		}
	},[])

	const TempServerResult = [
		{
			"title": "Wildcard Alliance - Asteroid City",
			"description": "Another piece done at Terraform for Wildcard Alliance which I forgot to post!\nArt Director - Dan Fadness\nCreative Director - Finnian MacManus",
			"created_at": "2023-07-03T05:59:42.340-05:00",
			"likes_count": 237,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/ZaOy5w",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/064/620/895/large/oliver-beck-terraform-wldc-asteroidcitywide-ob-003-01-copy.jpg"
			]
		},
		{
			"title": "Wildcard Alliance - Frostburn Skatepark",
			"description": "More work done for Wildcard Alliance at Terraform.\n\nThanks for Marat Zakirov for some of the awesome building assets! https://www.artstation.com/mrtzkrv\n\nArt Director - Dan Fadness\nCreative Director - Finnian MacManus \n\nAlso check out my Brainstorm Flash class here:\nhttps://www.brainstormschool.com/fb-ob",
			"created_at": "2023-04-01T03:19:32.830-05:00",
			"likes_count": 659,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/All3by",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/061/248/106/large/oliver-beck-wldc-ironbriarskatepark-ob-005-01-4k-copy.jpg"
			]
		},
		{
			"title": "Wildcard Alliance - Frost Haven Lodge",
			"description": "Really fun piece I got to do at Terraform for Wildcard Alliance\n\nArt Director - Dan Fadness\nCreative Director - Finnian MacManus ",
			"created_at": "2023-03-25T22:12:05.179-05:00",
			"likes_count": 372,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/QXXJ6l",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/061/002/511/large/oliver-beck-terraform-studios-112222-wldc-ob-frosthavenlodge-004-w.jpg"
			]
		},
		{
			"title": "Wildcard Alliance - Frostburn Arena Entrance",
			"description": "Some fun work I did at Terraform for Wildcard Alliance.\n\nThanks for Marat Zakirov for some of the awesome building assets! https://www.artstation.com/mrtzkrv\n\nArt Director - Dan Fadness\nCreative Director - Finnian MacManus \n\nAlso check out my Brainstorm Flash class here:\nhttps://www.brainstormschool.com/fb-ob",
			"created_at": "2023-04-13T03:26:32.974-05:00",
			"likes_count": 213,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/lDEVlY",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/061/677/117/large/oliver-beck-wldc-frostburnarenaentrance-ob-004-02-copy.jpg",
				"https://cdna.artstation.com/p/assets/images/images/061/677/120/large/oliver-beck-wldc-frostburnarenaentrance-ob-006-02-copy.jpg"
			]
		},
		{
			"title": "Wildcard Alliance - Frostburn Town Square",
			"description": "Some fun work I did for Terraform for Wildcard Alliance.\nWe went through a lot of iterations on the colors and grading...I personally much prefer the warmer versions! So fun to play around with the tones and lighting.\n\nThanks for Marat Zakirov for some of the awesome building assets! https://www.artstation.com/mrtzkrv\n\nArt Director - Dan Fadness\nCreative Director - Finnian MacManus \n",
			"created_at": "2023-03-30T00:12:54.864-05:00",
			"likes_count": 653,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/w00Xa9",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/061/165/689/large/oliver-beck-wldc-frostburn-townsquare-ob-001-01-copy.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/061/165/693/large/oliver-beck-wldc-frostburn-townsquare-ob-001-02.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/061/165/697/large/oliver-beck-wldc-frostburn-townsquare-ob-001-03-copy.jpg"
			]
		},
		{
			"title": "Wildcard Alliance - WBN Tower",
			"description": "More work done for Wildcard Alliance at Terraform.\n\nArt Director - Dan Fadness\nCreative Director - Finnian MacManus \n\nAlso check out my Brainstorm Flash class here: \nhttps://www.brainstormschool.com/fb-ob",
			"created_at": "2023-04-07T23:32:26.550-05:00",
			"likes_count": 136,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/49Ngrn",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/061/493/049/large/oliver-beck-wldc-frostburn-wbnheadquarters-ob-001-01.jpg",
				"https://cdna.artstation.com/p/assets/images/images/061/493/052/large/oliver-beck-wldc-frostburn-wbnheadquarters-ob-002-01.jpg"
			]
		},
		{
			"title": "Cryochamber",
			"description": "Did some more work on this image I got to do last year for HeroProjects. Definitely want to do more sci-fi stuff. Learned a ton about materials, shading and texturing with this one!\n\n",
			"created_at": "2023-03-21T10:11:33.778-05:00",
			"likes_count": 414,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/BX3gL8",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/060/827/898/large/oliver-beck-hp-int-cryochamber-ob-001-02.jpg",
				"https://cdnb.artstation.com/p/assets/covers/images/060/827/977/large/oliver-beck-oliver-beck-hp-int-cryochamber-ob-002-02.jpg",
				"https://cdna.artstation.com/p/assets/images/images/060/827/910/large/oliver-beck-hp-int-cryochamber-ob-002-02.jpg"
			]
		},
		{
			"title": "Future City",
			"description": "Another piece I did for HeroProjects, polished it up quite a bit. Was a fun one! \n\nAlso check out my Brainstorm Flash class here:\nhttps://www.brainstormschool.com/fb-ob\n\n",
			"created_at": "2023-05-29T01:32:44.181-05:00",
			"likes_count": 319,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/kQZY9y",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/063/345/737/large/oliver-beck-po.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/063/345/769/large/oliver-beck-hp-env-metaverselandscape-ob-004-01-copy.jpg"
			]
		},
		{
			"title": "Player Zero HQ",
			"description": "Concept I did last year for HeroProjects, polished it up a bit in my free time. Was a fun opportunity to experiment with modifiers and distorting meshes. Attached an earlier version as well that I thought was pretty cool.\n\nEdit: Small update, improving textures.\nHope you guys like it!\n\nCheck out my Brainstorm class here:\nhttps://www.brainstormschool.com/fb-ob",
			"created_at": "2023-05-20T08:13:06.015-05:00",
			"likes_count": 654,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/kQZzEA",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/covers/images/063/053/604/large/oliver-beck-oliver-beck-oliver-beck-paintover02-copy.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/063/101/635/large/oliver-beck-paintover01-copy.jpg",
				"https://cdna.artstation.com/p/assets/images/images/063/053/542/large/oliver-beck-oliver-beck-paintover01-copy.jpg"
			]
		},
		{
			"title": "Ultragenerator V2",
			"description": "Apologies for the repost! I realized I can improve this concept a lot more so I did some additional work on it. Let me know what you guys think!",
			"created_at": "2023-03-17T10:30:01.358-05:00",
			"likes_count": 411,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/1x4olG",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/060/677/208/large/oliver-beck-aerial.jpg",
				"https://cdna.artstation.com/p/assets/images/images/060/677/530/large/oliver-beck-oliver-beck-oliver-beck-sketch2-copy.jpg"
			]
		},
		{
			"title": "Megadome",
			"description": "Another piece I did for HeroProjects about a year ago. Again I was given a lot of time and freedom for this one, so it feels more like a personal piece. I recently spent a couple of days refining it more. It was a lot of fun working on it!\n\n\n",
			"created_at": "2023-02-24T07:20:57.684-06:00",
			"likes_count": 654,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/04Xka8",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/059/839/256/large/oliver-beck-final-4k.jpg",
				"https://cdna.artstation.com/p/assets/images/images/059/839/408/large/oliver-beck-wip.jpg"
			]
		},
		{
			"title": "Spaceport City",
			"description": "I did this concept about a year ago for HeroProjects. I had a lot of freedom for the design. Hope you like it!\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/?hl=en\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2023-02-11T06:02:13.101-06:00",
			"likes_count": 889,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/6Nnk8r",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/059/315/599/large/oliver-beck-final.jpg",
				"https://cdna.artstation.com/p/assets/video_clips/images/059/315/638/large/oliver-beck-thumb.jpg"
			]
		},
		{
			"title": "Terminus - City of Towers",
			"description": "Been chipping away on this one for a bit after work. Lots of fun!\nYou can find a process video on my twitter! https://twitter.com/OliverBeckArt",
			"created_at": "2024-01-26T08:31:28.811-06:00",
			"likes_count": 415,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/yDvGeO",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/covers/images/072/002/912/large/oliver-beck-oliver-beck-env-terminus-008-01-copy.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/072/002/735/large/oliver-beck-env-terminus-final-02.jpg"
			]
		},
		{
			"title": "Cathedral Lakes",
			"description": "Piece I did for fun playing around with some assets I made. This originally started as a demo for my students. \nHope you guys like it!\n\n",
			"created_at": "2023-11-05T07:48:54.557-06:00",
			"likes_count": 962,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/n0eJdK",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/069/025/663/large/oliver-beck-compositions-cathedral-005-01-copy.jpg"
			]
		},
		{
			"title": "Golden Towers",
			"description": "Some new stuff :) playing around with my assets. Started as a demo for students.\n\n",
			"created_at": "2023-11-14T10:30:36.157-06:00",
			"likes_count": 324,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/ao4WQ2",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/069/404/524/large/oliver-beck-final.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/069/371/777/large/oliver-beck-compositions-002-01-copy.jpg"
			]
		},
		{
			"title": "Castles",
			"description": "Trying some new things to speed up my workflow!",
			"created_at": "2023-07-07T05:01:29.914-05:00",
			"likes_count": 482,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/49PRvY",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/064/780/211/large/oliver-beck-01.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/064/780/215/large/oliver-beck-02.jpg"
			]
		},
		{
			"title": "The Southern Border",
			"description": "Been chipping away at this for a while, happy to finally finish it up. Hope you like it!\n-----------------------------\n\nMy idea for this was that this wall was built during a time of war, long ago. Since there has been peace for hundreds of years it has lost it's purpose and has been reclaimed by nature. \n\n-----------------------------\nBrainstorm Flash Class: \nhttps://www.brainstormschool.com/fb-ob\n\n",
			"created_at": "2023-06-02T09:52:59.164-05:00",
			"likes_count": 722,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/QXELYB",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/063/525/296/large/oliver-beck-thesouthernborder.jpg"
			]
		},
		{
			"title": "Eastern Interior",
			"description": "Started during Brainstorm class and took it further on my own time. I reused some assets from the exterior. I initially wanted to make this space more functional but ended up preferring the simplicity and openness of the current version. I tried to push my color grading techniques as well and am pretty happy with how that turned out!\n--------------------------------\nBrainstorm Flash class: \nhttps://www.brainstormschool.com/fb-ob\nBrainstorm Mentorship: \nhttps://www.brainstormschool.com/online-mentorship-w-beck",
			"created_at": "2023-09-08T23:27:48.200-05:00",
			"likes_count": 1199,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/zPB452",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/066/978/773/large/oliver-beck-01-4-of-4.jpg",
				"https://cdna.artstation.com/p/assets/images/images/066/978/770/large/oliver-beck-01-2-of-4.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/066/978/777/large/oliver-beck-01-1-of-4.jpg"
			]
		},
		{
			"title": "Emperor City",
			"description": "Fun piece I did for a client, they were kind enough to allow me to share it.  This one was pretty challenging. Thanks to my wife and my students for the feedback!",
			"created_at": "2023-09-17T02:13:34.960-05:00",
			"likes_count": 1862,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/8bEwDQ",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/067/252/141/large/oliver-beck-01.jpg"
			]
		},
		{
			"title": "Japanese Temple Garden",
			"description": "Commission I did for a client. Learned some new tools and tricks! Did a fair bit of paintover on this, trying to move away from the 3D look.\n\n\n\n",
			"created_at": "2024-02-04T00:32:57.989-06:00",
			"likes_count": 321,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/OGYJqJ",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/072/284/001/large/oliver-beck-01.jpg",
				"https://cdna.artstation.com/p/assets/images/images/072/283/996/large/oliver-beck-02.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/072/283/999/large/oliver-beck-03.jpg"
			]
		},
		{
			"title": "Fantasy Town",
			"description": "Started as a demo for Brainstorm. Ended up taking it further, practicing new techniques and workflows. Was a really fun piece. Thanks for Marco Gorlei for the feedback on this during the final stages!\n\nInstagram: https://www.instagram.com/oliverbeck_art/?hl=de\nTwitter: https://twitter.com/OliverBeckArt\n\nYou can sign up for my Brainstorm class here! https://www.brainstormschool.com/wbbenv\n\nEdit: Added video showing behind the scenes!",
			"created_at": "2022-11-12T07:23:53.129-06:00",
			"likes_count": 1571,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/zDZq5q",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/056/013/820/large/oliver-beck-final-4k2-copy.jpg",
				"https://cdnb.artstation.com/p/assets/video_clips/images/056/340/657/large/oliver-beck-thumb.jpg"
			]
		},
		{
			"title": "The Artefact",
			"description": "Had some time for a personal piece in between client work! This one was a lot of fun, really enjoying the 3D workflow in Blender. Used some assets from Jose Vega for the stone platform and the awesome knight from Pablo Dominguez.",
			"created_at": "2022-01-20T08:42:53.837-06:00",
			"likes_count": 2071,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/03z6R8",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/045/426/086/large/oliver-beck-image0015-2k.jpg",
				"https://cdna.artstation.com/p/assets/images/images/045/426/148/large/oliver-beck-sketch.jpg"
			]
		},
		{
			"title": "The Spire - Kitbash3D Gaea Cover",
			"description": "Cover for Kitbash3D!\n\nCheck out their new kit here: https://kitbash3d.com/collections/kits/products/gaea\n\nInstagram: https://www.instagram.com/oliverbeck_art/\nTwitter: https://twitter.com/OliverBeckArt",
			"created_at": "2021-08-03T11:11:49.139-05:00",
			"likes_count": 984,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/8e40kx",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/040/147/676/large/oliver-beck-final-3k.jpg",
				"https://cdna.artstation.com/p/assets/images/images/040/147/680/large/oliver-beck-final-3k-crop.jpg"
			]
		},
		{
			"title": "City of Bells",
			"description": "Started this as a demo for Brainstorm students last term. Finally decided to polish it up a bit. Not quite finished and probably the design can be worked out a bit better but I am happy with it as is. Obviously got a bit inspired by Elden Ring. Hope you like it!\n\n",
			"created_at": "2022-08-08T09:11:10.920-05:00",
			"likes_count": 1697,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/Wm5r1X",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/052/499/119/large/oliver-beck-bellcity.jpg"
			]
		},
		{
			"title": "Twinpeaks",
			"description": "Artwork I did for a client. Figuring out the lighting was quite a challenge.\nAlso added an earlier version which I prefer artistically but it did not fit the needs of the client.\n\n\n",
			"created_at": "2023-12-01T05:54:59.566-06:00",
			"likes_count": 1059,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/PXDGrr",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/069/971/646/large/oliver-beck-01.jpg",
				"https://cdna.artstation.com/p/assets/images/images/069/971/700/large/oliver-beck-01.jpg"
			]
		},
		{
			"title": "Bastion",
			"description": "Social Media:\r\nhttps://www.instagram.com/oliverbeck_art/\r\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2020-10-19T02:39:28.278-05:00",
			"likes_count": 1102,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/zOmWKw",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/031/254/530/large/oliver-beck-final.jpg"
			]
		},
		{
			"title": "Eastern Kingdom",
			"description": "Started during Brainstorm class and took it further on my own time. These were super fun to do. \n--------------------------------\nBrainstorm Flash class: \nhttps://www.brainstormschool.com/fb-ob\nBrainstorm Mentorship: \nhttps://www.brainstormschool.com/online-mentorship-w-beck",
			"created_at": "2023-09-03T02:15:40.891-05:00",
			"likes_count": 1061,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/m8grzZ",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/066/763/128/large/oliver-beck-final-2.jpg",
				"https://cdnb.artstation.com/p/assets/covers/images/066/763/145/large/oliver-beck-oliver-beck-final-2.jpg",
				"https://cdna.artstation.com/p/assets/images/images/066/763/126/large/oliver-beck-final-1.jpg"
			]
		},
		{
			"title": "Desert Ruins",
			"description": "Not finished by any means but a fun piece I wanted to share. Started as a demo for my Brainstorm students and developed it a bit further on my own time. \n\n",
			"created_at": "2022-08-01T10:37:40.264-05:00",
			"likes_count": 1585,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/aGJ5e2",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/052/261/417/large/oliver-beck-desertruins.jpg"
			]
		},
		{
			"title": "Fortress",
			"description": "",
			"created_at": "2021-04-03T11:46:41.318-05:00",
			"likes_count": 967,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/rAnb65",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/036/363/993/large/oliver-beck-untitled-2.jpg"
			]
		},
		{
			"title": "Crystal Palace - Grand Hall",
			"description": "Experimenting\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/?hl=en\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2021-01-11T01:50:40.528-06:00",
			"likes_count": 453,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/oAlQ5J",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/033/698/495/large/oliver-beck-int.jpg"
			]
		},
		{
			"title": "Crystal Palace",
			"description": "Having a lot of fun experimenting with workflows. \n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/?hl=en\nhttps://twitter.com/OliverBeckArt\n\n",
			"created_at": "2021-01-17T02:26:00.302-06:00",
			"likes_count": 747,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/Aq5zWq",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/033/900/323/large/oliver-beck-int-atlantis-crystalchamber-001-02-2k.jpg"
			]
		},
		{
			"title": "Sketches",
			"description": "Some quick experiments I did in Cinema4D and Octane over the past year.",
			"created_at": "2021-08-15T03:07:47.915-05:00",
			"likes_count": 1231,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/18JoOe",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/040/486/640/large/oliver-beck-theacademy-ig.jpg",
				"https://cdnb.artstation.com/p/assets/covers/images/040/486/691/large/oliver-beck-oliver-beck-theacademy-ig.jpg",
				"https://cdna.artstation.com/p/assets/images/images/040/486/622/large/oliver-beck-ega0iimxgaazjll.jpg"
			]
		},
		{
			"title": "Kingdom",
			"description": "Done in between work, aside from the hardsurface stuff I have been doing.\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2021-11-28T11:01:00.985-06:00",
			"likes_count": 973,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/OmoYZe",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/043/728/089/large/oliver-beck-final-03.jpg",
				"https://cdna.artstation.com/p/assets/video_clips/images/043/728/428/large/oliver-beck-thumb.jpg"
			]
		},
		{
			"title": "Alchemists Hideout",
			"description": "Trying to improve my understanding of materials and interiors. Lots of fun. \n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/?hl=en\nhttps://twitter.com/OliverBeckArt\n",
			"created_at": "2021-01-23T16:15:50.938-06:00",
			"likes_count": 1058,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/3dQkrB",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/034/116/484/large/oliver-beck-final.jpg"
			]
		},
		{
			"title": "Royal Library",
			"description": "Continuing to learn about materials and rendering as well as picking up some post production and color grading techniques.\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/?hl=en\nhttps://twitter.com/OliverBeckArt\n\nSketchfab model used: https://sketchfab.com/3d-models/jacobins-fountain-in-lyon-france-2f5ffec814bb4fcf9c1f6a36e3cf35b5",
			"created_at": "2021-02-04T17:27:55.581-06:00",
			"likes_count": 740,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/J9z0mz",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/034/513/942/large/oliver-beck-royal-library-2k.jpg"
			]
		},
		{
			"title": "KitBash3D Colonial Cover",
			"description": "I had the honor to create the cover art for the awesome new Colonial Kit by Kitbash3D. It was a lot of fun to work on! You can check the kit out here:\nhttps://kitbash3d.com/collections/kits/products/colonial\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/?hl=en\nhttps://twitter.com/OliverBeckArt\n\n",
			"created_at": "2021-01-11T15:12:11.783-06:00",
			"likes_count": 975,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/bKPbRE",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/033/734/863/large/oliver-beck-final.jpg"
			]
		},
		{
			"title": "Atlantis",
			"description": "Experimenting with workflows!\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/?hl=en\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2020-12-29T09:05:28.635-06:00",
			"likes_count": 1567,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/3dBa9v",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/033/339/428/large/oliver-beck-atlantis-exploration-v-001-01.jpg",
				"https://cdna.artstation.com/p/assets/covers/images/038/448/948/large/oliver-beck-oliver-beck-oliver-beck-atlantis-exploration-v-001-01.jpg",
				"https://cdna.artstation.com/p/assets/images/images/033/339/422/large/oliver-beck-atlantis-exploration-v-001-02.jpg"
			]
		},
		{
			"title": "Coral Valley - Caverns",
			"description": "Learning new worfklows!\n\n",
			"created_at": "2021-05-23T01:39:49.262-05:00",
			"likes_count": 485,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/q9V3AD",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/037/944/544/large/oliver-beck-final.jpg",
				"https://cdna.artstation.com/p/assets/images/images/038/448/964/large/oliver-beck-oliver-beck-final-alt.jpg"
			]
		},
		{
			"title": "Passage to Londor",
			"description": "Thanks a lot to my good friend Florian Herold for the valuable feedback!\r\nSocial Media:\r\nhttps://www.instagram.com/oliverbeck_art/\r\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2020-04-13T02:43:31.190-05:00",
			"likes_count": 520,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/L2o8R5",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/028/139/609/large/oliver-beck-oliver-beck-gate-to-londor.jpg"
			]
		},
		{
			"title": "Return Home",
			"description": "Experimenting, trying to incorporate characters more!\n\nInstagram: https://www.instagram.com/oliverbeck_art/\n\nTwitter: https://twitter.com/OliverBeckArt",
			"created_at": "2021-06-07T09:42:48.911-05:00",
			"likes_count": 2669,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/oAvNKm",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/038/426/962/large/oliver-beck-final.jpg"
			]
		},
		{
			"title": "Explorer",
			"description": "This was done mainly to test a new 3D workflow.\r\nSocial Media:\r\nhttps://www.instagram.com/oliverbeck_art/\r\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2020-02-27T15:54:54.501-06:00",
			"likes_count": 839,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/ybOPY3",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/028/139/489/large/oliver-beck-oliver-beck-render-edit-downres.jpg"
			]
		},
		{
			"title": "Wendora",
			"description": "Social Media:\r\nhttps://www.instagram.com/oliverbeck_art/\r\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2020-08-15T12:13:00.948-05:00",
			"likes_count": 759,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/q9JaXa",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/029/430/188/large/oliver-beck-final-fullres.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/029/428/445/large/oliver-beck-untitled-1.jpg"
			]
		},
		{
			"title": "Pantheon",
			"description": "Personal work in between client projects. Moving on to next one.\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2020-10-24T05:35:25.985-05:00",
			"likes_count": 314,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/ZGJ801",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/031/407/717/large/oliver-beck-final-2k.jpg"
			]
		},
		{
			"title": "Hunter",
			"description": "Learning more in between projects. Thanks to Maarten Hermans for the feedback.\n\n\nSocial Media:\nhttps://www.instagram.com/oliverbeck_art/\nhttps://twitter.com/OliverBeckArt\n\n",
			"created_at": "2021-12-19T11:57:14.476-06:00",
			"likes_count": 722,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/JevWDn",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/044/413/107/large/oliver-beck-2k-cropped-01.jpg",
				"https://cdna.artstation.com/p/assets/images/images/044/413/110/large/oliver-beck-2k-cropped-02.jpg"
			]
		},
		{
			"title": "Forgotten Oasis",
			"description": "Love working in Unreal Engine and have been using it for a couple of months for work. Finally had the time to do a small personal project in it.\n\n",
			"created_at": "2021-03-20T18:56:23.138-05:00",
			"likes_count": 152,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/kD3b5y",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/video_clips/images/035/930/317/large/oliver-beck-thumb.jpg",
				"https://cdnb.artstation.com/p/assets/covers/images/035/930/607/large/oliver-beck-oliver-beck-shot-02.jpg",
				"https://cdnb.artstation.com/p/assets/video_clips/images/035/930/279/large/oliver-beck-thumb.jpg"
			]
		},
		{
			"title": "The Last Watcher",
			"description": "Thanks to Ellie Cooper and Reuben Lane for the Feedback.\r\n\r\nSocial Media:\r\nhttps://www.instagram.com/oliverbeck_art/\r\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2020-08-05T06:54:30.668-05:00",
			"likes_count": 1808,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/rAlJDG",
			"artwork_urls": [
				"https://cdna.artstation.com/p/assets/images/images/029/155/858/large/oliver-beck-final-halfres.jpg"
			]
		},
		{
			"title": "Quiet Place",
			"description": "This has been sitting on my hard drive for a while and I finally found some time to finish it. I wanted to make a serene natural scene with some interesting architectural elements too, but mainly organic. I hope you like it!\n\n",
			"created_at": "2023-03-04T10:13:24.489-06:00",
			"likes_count": 322,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/39dZEm",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/060/157/579/large/oliver-beck-00-01.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/060/157/583/large/oliver-beck-002-01.jpg"
			]
		},
		{
			"title": "Old World",
			"description": "Done for practice!\nI used the awesome assets from Quentin Mabille for most of the architecture.\n\nInstagram: https://www.instagram.com/oliverbeck_art/ \nTwitter: https://twitter.com/OliverBeckArt",
			"created_at": "2021-06-20T07:54:52.070-05:00",
			"likes_count": 2882,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/XnQmVw",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/038/827/805/large/oliver-beck-final-2k.jpg",
				"https://cdna.artstation.com/p/assets/images/images/038/827/888/large/oliver-beck-01.jpg"
			]
		},
		{
			"title": "Three Towers",
			"description": "Just having fun with painting\n\nInstagram: https://www.instagram.com/oliverbeck_art/\n\nTwitter: https://twitter.com/OliverBeckArt",
			"created_at": "2021-08-30T00:24:27.577-05:00",
			"likes_count": 849,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/v2geZx",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/040/931/305/large/oliver-beck-07.jpg"
			]
		},
		{
			"title": "Forest Temple",
			"description": "Sketch, trying new techniques!\n\nhttps://www.instagram.com/accounts/login/\n\nhttps://twitter.com/OliverBeckArt",
			"created_at": "2021-09-26T15:39:56.928-05:00",
			"likes_count": 1787,
			"adult_content": false,
			"permalink": "https://www.artstation.com/artwork/eaOVJw",
			"artwork_urls": [
				"https://cdnb.artstation.com/p/assets/images/images/041/784/405/large/oliver-beck-foresttemple.jpg"
			]
		}
	]

	useEffect(() => {
		const url = `http://localhost:5000/?username=${UserData.User_Portfolio.split('/').pop()}`;

		axios
			.get(url, {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'Accept-Language': 'en-US,en;q=0.5',
				},
				timeout: 3000,
			})
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data)
					setArtworkData(response.data);
				} else {
					setArtworkData({
						data: 'No_Data.webp',
					});
				}
			})
			.catch(() => {
				// setArtworkData({
				// 	data: 'No_Data.webp',
				// });
				setArtworkData(TempServerResult)
			});
	}, []);


	useEffect(() => {
		const CustomCursor = document.getElementById("CustomCursor")
		
		document.addEventListener("mousemove", (event) => {
			CustomCursor.style.left = (event.clientX - 23) + "px"
			CustomCursor.style.top = (event.clientY - 23) + "px"
		})
	}, [])


	// useEffect(() => {
	// 	if (Isloading === false){
	// 		gsap.to("#LandingPage",{
	// 			duration: 1,
	// 			opacity: 1,
	// 		})
	// 	}
	// },[Isloading])

  	return (
		<DataContext.Provider value={{ 
			ArtworkData,
			UserData,
			CameraFov,
			ScreenSize,
			IsDarkMode,
			setIsDarkMode,
			CurrentImage, 
			setCurrentImage,
			isImageViewerOpen, 
			setisImageViewerOpen,
			setIsloading,
			IsContactPageOpen,
			setIsContactPageOpen,
			AmbientLightIntensity, 
			setAmbientLightIntensity,
			}}>
			{ArtworkData.length != 0 && <MainComponent />}
			<div className={`fixed top-0 w-full pointer-events-none`}>
				{isImageViewerOpen && (
					<div className="pointer-events-auto">
						<ImageViewerComponent CurrentImage={CurrentImage} setisImageViewerOpen={setisImageViewerOpen} />
					</div>
				)}
				{ArtworkData.length === 0 && <LoadingComponent />}
				{/* {Isloading === false && <>
					<PageProgressComponent />
					<ContactpageComponent />
					<HomepageComponent /> 
					<GallerypageComponent />
				</>} */}
				<WhiteScreenComponent /> 
				<OverlayComponent />

				{/* <CustomCursorComponent />
				{!isImageViewerOpen && <ArtCounterComponent />} */}
			</div>
			
		</DataContext.Provider>
  	)
}

export default App