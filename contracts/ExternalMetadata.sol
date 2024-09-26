//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import 'base64-sol/base64.sol';
import './AnybodyProblem.sol';
import './BokkyPooBahsDateTimeLibrary.sol';
import './StringsExtended.sol';
import './ThemeGroupBlues.sol';

/// @title ExternalMetadata
/// @notice
/// @author @okwme & @dataexcess
/// @dev The updateable and replaceable problemMetadata contract

contract ExternalMetadata is Ownable {
    using BokkyPooBahsDateTimeLibrary for uint;
    address payable public anybodyProblem;
    address payable public speedruns;
    ThemeGroup public themeGroup;
    address public assets1;
    address public assets2;
    address public assets3;
    address public assets4;
    address public assets5;

    struct AssetData {
        address assetAddress;
        string functionName;
    }

    mapping(ThemeGroup.ThemeLayer => uint256) private svgShapeCategorySizes;
    mapping(ThemeGroup.ThemeLayer => AssetData[]) private svgShapes;

    constructor(address themeGroup_) {
        themeGroup = ThemeGroup(themeGroup_);
    }

    function setAssets(address[5] memory assets) public onlyOwner {
        assets1 = assets[0];
        assets2 = assets[1];
        assets3 = assets[2];
        assets4 = assets[3];
        assets5 = assets[4];
    }

    function readValueFromContract(
        address contractAddress,
        string memory functionName
    ) public view returns (string memory) {
        (bool success, bytes memory data) = contractAddress.staticcall(
            abi.encodeWithSignature(functionName)
        );
        require(success, 'Failed to read value from contract');
        return abi.decode(data, (string));
    }

    function setupSVGPaths() public onlyOwner {
        AssetData[] storage faceShapes = svgShapes[ThemeGroup.ThemeLayer.Face];
        AssetData[] storage coreShapes = svgShapes[ThemeGroup.ThemeLayer.Core];
        AssetData[] storage bgShapes = svgShapes[ThemeGroup.ThemeLayer.BG];
        AssetData[] storage fgShapes = svgShapes[ThemeGroup.ThemeLayer.FG];

        svgShapeCategorySizes[ThemeGroup.ThemeLayer.Face] = 14;
        svgShapeCategorySizes[ThemeGroup.ThemeLayer.BG] = 10;
        svgShapeCategorySizes[ThemeGroup.ThemeLayer.FG] = 10;
        svgShapeCategorySizes[ThemeGroup.ThemeLayer.Core] = 1;

        faceShapes.push(
            AssetData({assetAddress: assets5, functionName: 'FACE_SHAPE_1()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets4, functionName: 'FACE_SHAPE_2()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets4, functionName: 'FACE_SHAPE_3()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets4, functionName: 'FACE_SHAPE_4()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets4, functionName: 'FACE_SHAPE_5()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets4, functionName: 'FACE_SHAPE_6()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets4, functionName: 'FACE_SHAPE_7()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets4, functionName: 'FACE_SHAPE_8()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets5, functionName: 'FACE_SHAPE_9()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets5, functionName: 'FACE_SHAPE_10()'})
        );
        coreShapes.push(
            AssetData({assetAddress: assets2, functionName: 'CORE_SHAPE_1()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets5, functionName: 'FACE_SHAPE_11()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets5, functionName: 'FACE_SHAPE_12()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets5, functionName: 'FACE_SHAPE_13()'})
        );
        faceShapes.push(
            AssetData({assetAddress: assets5, functionName: 'FACE_SHAPE_14()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_1()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_2()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_3()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_4()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_5()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_6()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_7()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_8()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_9()'})
        );
        bgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'BG_SHAPE_10()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets2, functionName: 'FG_SHAPE_1()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets2, functionName: 'FG_SHAPE_2()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets1, functionName: 'FG_SHAPE_3()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets2, functionName: 'FG_SHAPE_4()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets2, functionName: 'FG_SHAPE_5()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets3, functionName: 'FG_SHAPE_6()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets3, functionName: 'FG_SHAPE_7()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets3, functionName: 'FG_SHAPE_8()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets2, functionName: 'FG_SHAPE_9()'})
        );
        fgShapes.push(
            AssetData({assetAddress: assets2, functionName: 'FG_SHAPE_10()'})
        );
    }

    /// @dev generates the problemMetadata
    /// @param date the date
    function getMetadata(uint256 date) public view returns (string memory) {
        string memory svg = getSVG(date);
        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        abi.encodePacked(
                            '{"name":"',
                            getName(date),
                            '",',
                            '"description": "Anybody Problem (https://anybody.gg)",',
                            '"image": "',
                            svg,
                            '",',
                            '"image_url": "',
                            svg,
                            '",',
                            '"home_url": "https://anybody.gg",',
                            '"external_url": "https://anybody.gg",',
                            '"animation_url": "https://nft.anybody.gg/#',
                            StringsExtended.toString(date),
                            getBestTimeEncoded(date),
                            '",',
                            '"attributes": ',
                            getAttributes(date),
                            '}'
                        )
                    )
                )
            );
    }

    function getBestTimeEncoded(
        uint256 date
    ) public view returns (string memory) {
        uint256 bestRunId = AnybodyProblem(anybodyProblem).fastestByDay(date)[
            0
        ];

        AnybodyProblem.Level[] memory levels = AnybodyProblem(anybodyProblem)
            .getLevelsData(bestRunId);

        string memory encoded = '{"levels":[';

        for (uint256 i = 0; i < levels.length; i++) {
            AnybodyProblem.Level memory level = levels[i];
            encoded = string(
                abi.encodePacked(
                    encoded,
                    '{"events": [{"time":',
                    StringsExtended.toString(level.time),
                    '}]}',
                    (i == levels.length - 1 ? '' : ',')
                )
            );
        }
        encoded = Base64.encode(abi.encodePacked(encoded, ']}'));
        return string(abi.encodePacked('-', encoded));
    }

    function getName(uint256 date) public pure returns (string memory) {
        (uint year, uint month, uint day) = BokkyPooBahsDateTimeLibrary
            .timestampToDate(date);
        return
            string(
                abi.encodePacked(
                    StringsExtended.toString(year),
                    '-',
                    StringsExtended.toString(month),
                    '-',
                    StringsExtended.toString(day)
                )
            );
    }

    function getHTML(uint256 date) public view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    'data:text/html;base64,',
                    Base64.encode(
                        abi.encodePacked(
                            "<html><body><img src='",
                            getSVG(date),
                            "'></body></html>"
                        )
                    )
                )
            );
    }

    /// @dev function to generate a SVG String
    function getSVG(uint256 date) public view returns (string memory) {
        return
            string(
                abi.encodePacked(
                    'data:image/svg+xml;base64,',
                    Base64.encode(
                        abi.encodePacked(
                            '<?xml version="1.0" encoding="utf-8"?>',
                            '<svg xmlns="http://www.w3.org/2000/svg"  height="100%" width="100%" viewBox="0 0 1000 1000" style="background-color:transparent;">',
                            getPath(date),
                            // '<text x="50" y="550" class="name">',
                            // getName(date),
                            // '</text>','
                            '</svg>'
                        )
                    )
                )
            );
    }

    function getPath(uint256 date) internal view returns (string memory) {
        string memory path = string(
            abi.encodePacked(
                '<style>',
                '#id-hero ',
                '{ ',
                'transform-origin: 300px 300px; ',
                'transform: translate(200px, 200px) scale(1.8); ',
                '}',
                '</style>'
                '<g id="id-hero">',
                getHeroBodyPath(date),
                '</g>'
            )
        );

        return path;
    }

    function getHeroBodyPath(
        uint256 day
    ) internal view returns (string memory) {
        //FACE SHAPE
        uint256 extraSeed = day == 1723766400 ? 19 : 0;

        bytes32 rand = keccak256(abi.encodePacked(day, extraSeed));
        uint256 pathIdxFace = randomRange(
            0,
            svgShapeCategorySizes[ThemeGroup.ThemeLayer.Face] - 1,
            rand,
            day
        );
        AssetData memory pathFaceData = svgShapes[ThemeGroup.ThemeLayer.Face][
            pathIdxFace
        ];
        string memory pathFace = readValueFromContract(
            pathFaceData.assetAddress,
            pathFaceData.functionName
        );

        //BACKGROUND SHAPE
        rand = keccak256(abi.encodePacked(rand));
        uint256 pathIdxBG = randomRange(
            0,
            svgShapeCategorySizes[ThemeGroup.ThemeLayer.BG] - 1,
            rand,
            day
        );
        AssetData memory pathBGData = svgShapes[ThemeGroup.ThemeLayer.BG][
            pathIdxBG
        ];
        string memory pathBG = readValueFromContract(
            pathBGData.assetAddress,
            pathBGData.functionName
        );

        //FOREGROUND SHAPE
        rand = keccak256(abi.encodePacked(rand));
        uint256 pathIdxFG = randomRange(
            0,
            svgShapeCategorySizes[ThemeGroup.ThemeLayer.FG] - 1,
            rand,
            day
        );
        AssetData memory pathFGData = svgShapes[ThemeGroup.ThemeLayer.FG][
            pathIdxFG
        ];
        string memory pathFG = readValueFromContract(
            pathFGData.assetAddress,
            pathFGData.functionName
        );

        //CORE SHAPE
        rand = keccak256(abi.encodePacked(rand));
        uint256 pathIdxCore = randomRange(
            0,
            svgShapeCategorySizes[ThemeGroup.ThemeLayer.Core] - 1,
            rand,
            day
        );
        AssetData memory pathCoreData = svgShapes[ThemeGroup.ThemeLayer.Core][
            pathIdxCore
        ];
        string memory pathCore = readValueFromContract(
            pathCoreData.assetAddress,
            pathCoreData.functionName
        );

        //DAILY COLOR THEME
        rand = keccak256(abi.encodePacked(rand));
        uint8 themegroupsAmount = themeGroup.themeCount();
        ThemeGroup.ThemeName currentDayTheme = ThemeGroup.ThemeName(
            randomRange(0, themegroupsAmount - 1, rand, day)
        );

        //BACKGROUND COLOR (Hue, Saturation, Lightness)
        uint256[3] memory colorsBGValues;
        (colorsBGValues, rand) = getHeroBodyLayerColor(
            rand,
            currentDayTheme,
            ThemeGroup.ThemeLayer.BG,
            day
        );
        string memory colorsBG = string(
            abi.encodePacked(
                'hsl(',
                StringsExtended.toString(colorsBGValues[0]),
                ',',
                StringsExtended.toString(colorsBGValues[1]),
                '%,',
                StringsExtended.toString(colorsBGValues[2]),
                '%)'
            )
        );

        //CORE COLOR
        uint256[3] memory colorsCoreValues;
        (colorsCoreValues, rand) = getHeroBodyLayerColor(
            rand,
            currentDayTheme,
            ThemeGroup.ThemeLayer.Core,
            day
        );
        string memory colorsCore = string(
            abi.encodePacked(
                'hsl(',
                StringsExtended.toString(colorsCoreValues[0]),
                ',',
                StringsExtended.toString(colorsCoreValues[1]),
                '%,',
                StringsExtended.toString(colorsCoreValues[2]),
                '%)'
            )
        );

        //FOREGROUND COLOR
        uint256[3] memory colorsFGValues;
        (colorsFGValues, rand) = getHeroBodyLayerColor(
            rand,
            currentDayTheme,
            ThemeGroup.ThemeLayer.FG,
            day
        );
        string memory colorsFG = string(
            abi.encodePacked(
                'hsl(',
                StringsExtended.toString(colorsFGValues[0]),
                ',',
                StringsExtended.toString(colorsFGValues[1]),
                '%,',
                StringsExtended.toString(colorsFGValues[2]),
                '%)'
            )
        );

        string memory path = string(
            abi.encodePacked(
                getRotationAnimation(
                    'BG',
                    '300px 300px',
                    '0px, 0px',
                    '12',
                    '0',
                    'reverse'
                ),
                '<g id="id-BG" fill="',
                colorsBG,
                '" >',
                pathBG,
                '</g>',
                getRotationAnimation(
                    'Core',
                    '113px 113px',
                    '187px, 187px',
                    '34',
                    '0',
                    'normal'
                ),
                '<g id="id-Core" fill="',
                colorsCore,
                '" >',
                pathCore,
                '</g>',
                getRotationAnimation(
                    'FG',
                    '300px 300px',
                    '0px,0px',
                    '8',
                    '0',
                    pathIdxFG == 9
                        ? 'reverse'
                        : pathIdxFG == 1 || pathIdxFG == 8
                        ? 'none'
                        : 'normal'
                ),
                '<g id="id-FG" fill="',
                colorsFG,
                '" >',
                pathFG,
                '</g>',
                '<g id="id-Face">',
                pathFace,
                '</g>'
            )
        );

        return path;
    }

    function getRotationAnimation(
        string memory bodyId,
        string memory transformOrigin,
        string memory translation,
        string memory duration,
        string memory delay,
        string memory direction
    ) internal pure returns (string memory) {
        string memory none = 'none';
        if (
            keccak256(abi.encodePacked(direction)) ==
            keccak256(abi.encodePacked(none))
        ) return '';
        string memory path = string(
            abi.encodePacked(
                '<style> @keyframes move',
                bodyId,
                ' ',
                '{ ',
                '0% { ',
                'transform-origin: ',
                transformOrigin,
                ';',
                'transform: translate(',
                translation,
                ') rotate(0deg); }',
                '100% {',
                'transform-origin: ',
                transformOrigin,
                ';',
                'transform: translate(',
                translation,
                ') rotate(360deg); }',
                '} ',
                '#id-',
                bodyId,
                ' ',
                '{ ',
                'animation: move',
                bodyId,
                ' ',
                duration,
                's infinite linear; ',
                'animation-delay: ',
                delay,
                's; ',
                'animation-direction: ',
                direction,
                '; ',
                '}',
                '</style>'
            )
        );
        return path;
    }

    function getFastestTime(
        uint256 date,
        uint256 placeIndex
    ) public view returns (address, string memory sec) {
        uint256 runId = AnybodyProblem(anybodyProblem).fastestByDay(date)[
            placeIndex
        ];
        AnybodyProblem.Run memory run = AnybodyProblem(anybodyProblem).runs(
            runId
        );
        address player = run.owner;
        uint256 timeCompleted = run.accumulativeTime;

        uint256 precision = 1000;
        uint256 fps = 25;
        timeCompleted = (timeCompleted * precision) / fps;
        uint256 timeSeconds = timeCompleted / precision;
        uint256 timeMs = (timeCompleted - timeSeconds * precision) / 10;

        return (
            player,
            string(
                abi.encodePacked(
                    StringsExtended.toString(timeSeconds),
                    '.',
                    StringsExtended.toString(timeMs)
                )
            )
        );
    }

    /// @dev generates the attributes as JSON String
    function getAttributes(uint256 date) public view returns (string memory) {
        (uint year, uint month, ) = BokkyPooBahsDateTimeLibrary.timestampToDate(
            date
        );

        (address fastestAddress, string memory fastestTime) = getFastestTime(
            date,
            0
        );
        (
            address secondFastestAddress,
            string memory secondFastestTime
        ) = getFastestTime(date, 1);
        (
            address thirdFastestAddress,
            string memory thirdFastestTime
        ) = getFastestTime(date, 2);

        return
            string(
                abi.encodePacked(
                    '[',
                    '{"trait_type":"Galaxy","value":"BASED"},',
                    '{"trait_type":"Day","value":"',
                    StringsExtended.toString(date),
                    '"}, {"trait_type":"Year-Month","value":"',
                    StringsExtended.toString(year),
                    '-',
                    Math.log10(month) + 1 == 1 ? '0' : '',
                    StringsExtended.toString(month),
                    '"}, {"trait_type":"1st Place","value":"0x',
                    StringsExtended.toHexString(fastestAddress),
                    '"}, {"trait_type":"1st Place Time (s)","value":"',
                    fastestTime,
                    '"}, {"trait_type":"2nd Place","value":"0x',
                    StringsExtended.toHexString(secondFastestAddress),
                    '"}, {"trait_type":"2nd Place Time (s)","value":"',
                    secondFastestTime,
                    '"}, {"trait_type":"3rd Place","value":"0x',
                    StringsExtended.toHexString(thirdFastestAddress),
                    '"}, {"trait_type":"3rd Place Time (s)","value":"',
                    thirdFastestTime,
                    '"}]'
                )
            );
    }

    function getHeroBodyLayerColor(
        bytes32 seed,
        ThemeGroup.ThemeName theme,
        ThemeGroup.ThemeLayer layer,
        uint256 day
    ) public view returns (uint256[3] memory, bytes32) {
        bytes32 rand = keccak256(abi.encodePacked(seed));
        ThemeGroup.ThemeSpecs memory themeSpecs = themeGroup.getColourThemes(
            theme,
            layer
        );

        uint256 hue = randomRange(
            themeSpecs.hueStart,
            themeSpecs.hueEnd,
            rand,
            day
        );

        rand = keccak256(abi.encodePacked(rand));
        uint256 sat = randomRange(
            themeSpecs.saturationStart,
            themeSpecs.saturationEnd,
            rand,
            day
        );

        rand = keccak256(abi.encodePacked(rand));
        uint256 light = randomRange(
            themeSpecs.lightnessStart,
            themeSpecs.lightnessEnd,
            rand,
            day
        );

        return ([hue, sat, light], rand);
    }

    function getBaddieBodyColor(
        uint256 day,
        uint256 bodyIndex
    ) internal view returns (uint256[3] memory hsl) {
        bytes32 rand = keccak256(abi.encodePacked(day, bodyIndex));
        uint256 hue = randomRange(0, 359, rand, day);
        rand = keccak256(abi.encodePacked(rand));
        uint256 saturation = randomRange(90, 100, rand, day);

        rand = keccak256(abi.encodePacked(rand));
        uint256 lightness = randomRange(55, 60, rand, day);

        return [hue, saturation, lightness];
    }

    function randomRange(
        uint256 min,
        uint256 max,
        bytes32 seed,
        uint256 day
    ) internal view returns (uint256) {
        return AnybodyProblem(anybodyProblem).randomRange(min, max, seed, day);
    }

    function updateAnybodyProblemAddress(
        address payable anybodyProblem_
    ) public onlyOwner {
        anybodyProblem = anybodyProblem_;
    }

    function updateSpeedrunsAddress(
        address payable speedruns_
    ) public onlyOwner {
        speedruns = speedruns_;
    }
}
