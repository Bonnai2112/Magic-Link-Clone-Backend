import jwt from "jsonwebtoken";
import { User } from "../Models/user";

import { sendMail } from "../config/sendMail";
import { schema } from "../config/validation";
import { ethers } from "ethers";
import { Request, Response } from "express";

import { config } from "dotenv";
import { AppState } from "../Models";
config()

export const sendEmailtoUser = async (req: Request, res: Response) => {
  try {
    const { email, redirectUrl } = req.body;

    const check = schema.validate({ email });

    if (check?.error?.details)
      return res
        .status(400)
        .json({ success: false, message: "Please fill valid email" });

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Please fill details" });

    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) {
      await new User({
        email
      }).save();
    }
    const token = jwt.sign(
      {
        email,
      },
      process.env.JWT as string, // to replace with keccak-256 or AES
      {
        expiresIn: "10m",
      }
    );
    await sendMail(email, `${process.env.BASE}?token=${token}&redirect=${redirectUrl}`);
    res.status(200).json({
      success: true,
      message: "Link sent successfuly to your email",
    });
  } catch (error) {
    console.log(error);
  }
};

export const confirmUser = async (req: Request, res: Response) => {
  try {
    const { token, redirect } = req.query;
    console.log("redirect => ", req.query)

    if (!token) return res.json({ success: false, message: "Invalid link" });

    jwt.verify(token as string, process.env.JWT as string, async (err, decoded: any) => {
      if (err)
        return res.json({
          success: false,
          message: "Link expired",
        });

      const found = await User.findOne({ email: decoded?.email });

      if (!found) res.json({ success: false, message: "Someting went wrong" });

      const defaultSigner = ethers.Wallet.createRandom();

      // create appstates
      const newAppstate = await new AppState({
        "keyShares": [
          {
            "label": "Wallet 1",
            "share": {
              "localKey": {
                "i": 2,
                "t": 1,
                "n": 3
              },
              "publicKey": [
                4,
                120,
                253,
                127,
                178,
                137,
                252,
                123,
                89,
                197,
                56,
                28,
                63,
                7,
                4,
                122,
                99,
                88,
                187,
                243,
                201,
                210,
                101,
                86,
                146,
                42,
                166,
                236,
                105,
                133,
                197,
                228,
                93,
                225,
                191,
                155,
                21,
                145,
                125,
                244,
                121,
                118,
                58,
                40,
                249,
                118,
                214,
                44,
                2,
                211,
                236,
                151,
                220,
                84,
                102,
                98,
                134,
                58,
                21,
                113,
                79,
                9,
                14,
                162,
                159
              ],
              "address": "0x0c2d8a6ca20f63479179b31bf8eb23c0fdcbb00d"
            }
          },
          {
            "label": "Wallet 1",
            "share": {
              "localKey": {
                "i": 3,
                "t": 1,
                "n": 3
              },
              "publicKey": [
                4,
                120,
                253,
                127,
                178,
                137,
                252,
                123,
                89,
                197,
                56,
                28,
                63,
                7,
                4,
                122,
                99,
                88,
                187,
                243,
                201,
                210,
                101,
                86,
                146,
                42,
                166,
                236,
                105,
                133,
                197,
                228,
                93,
                225,
                191,
                155,
                21,
                145,
                125,
                244,
                121,
                118,
                58,
                40,
                249,
                118,
                214,
                44,
                2,
                211,
                236,
                151,
                220,
                84,
                102,
                98,
                134,
                58,
                21,
                113,
                79,
                9,
                14,
                162,
                159
              ],
              "address": "0x0c2d8a6ca20f63479179b31bf8eb23c0fdcbb00d"
            }
          },
          {
            "label": "Wallet 1",
            "share": {
              "localKey": {
                "i": 1,
                "t": 1,
                "n": 3
              },
              "publicKey": [
                4,
                120,
                253,
                127,
                178,
                137,
                252,
                123,
                89,
                197,
                56,
                28,
                63,
                7,
                4,
                122,
                99,
                88,
                187,
                243,
                201,
                210,
                101,
                86,
                146,
                42,
                166,
                236,
                105,
                133,
                197,
                228,
                93,
                225,
                191,
                155,
                21,
                145,
                125,
                244,
                121,
                118,
                58,
                40,
                249,
                118,
                214,
                44,
                2,
                211,
                236,
                151,
                220,
                84,
                102,
                98,
                134,
                58,
                21,
                113,
                79,
                9,
                14,
                162,
                159
              ],
              "address": "0x0c2d8a6ca20f63479179b31bf8eb23c0fdcbb00d"
            }
          }
        ],
        "messageProofs": {
          "0x0c2d8a6ca20f63479179b31bf8eb23c0fdcbb00d": [
            {
              "signature": {
                "r": {
                  "curve": "secp256k1",
                  "scalar": [
                    160,
                    188,
                    33,
                    76,
                    17,
                    131,
                    86,
                    222,
                    237,
                    247,
                    81,
                    138,
                    223,
                    244,
                    129,
                    247,
                    181,
                    177,
                    251,
                    160,
                    23,
                    178,
                    157,
                    189,
                    10,
                    111,
                    180,
                    124,
                    202,
                    162,
                    10,
                    185
                  ]
                },
                "s": {
                  "curve": "secp256k1",
                  "scalar": [
                    18,
                    154,
                    235,
                    41,
                    239,
                    216,
                    47,
                    210,
                    211,
                    225,
                    228,
                    56,
                    181,
                    69,
                    182,
                    64,
                    120,
                    100,
                    71,
                    217,
                    239,
                    138,
                    182,
                    228,
                    162,
                    70,
                    42,
                    98,
                    164,
                    248,
                    117,
                    110
                  ]
                },
                "recid": 1
              },
              "address": "0x0c2d8a6ca20f63479179b31bf8eb23c0fdcbb00d",
              "value": {
                "digest": [
                  199,
                  59,
                  117,
                  78,
                  106,
                  49,
                  125,
                  233,
                  153,
                  171,
                  6,
                  49,
                  4,
                  226,
                  118,
                  157,
                  147,
                  140,
                  19,
                  185,
                  136,
                  42,
                  36,
                  112,
                  240,
                  15,
                  1,
                  14,
                  33,
                  115,
                  141,
                  17
                ],
                "message": "Hello MPC wallet with custom magic link world ! "
              },
              "timestamp": 1684154396004
            }
          ]
        },
        "transactionReceipts": {
          "0x0c2d8a6ca20f63479179b31bf8eb23c0fdcbb00d": [
            {
              "signature": {
                "r": {
                  "curve": "secp256k1",
                  "scalar": [
                    77,
                    180,
                    233,
                    148,
                    2,
                    254,
                    162,
                    49,
                    161,
                    17,
                    136,
                    4,
                    99,
                    93,
                    87,
                    157,
                    140,
                    174,
                    200,
                    64,
                    229,
                    111,
                    37,
                    126,
                    169,
                    255,
                    29,
                    170,
                    214,
                    202,
                    42,
                    1
                  ]
                },
                "s": {
                  "curve": "secp256k1",
                  "scalar": [
                    85,
                    102,
                    136,
                    55,
                    161,
                    63,
                    68,
                    84,
                    27,
                    232,
                    199,
                    236,
                    179,
                    27,
                    25,
                    46,
                    154,
                    21,
                    1,
                    1,
                    124,
                    43,
                    126,
                    238,
                    164,
                    139,
                    31,
                    27,
                    85,
                    186,
                    97,
                    213
                  ]
                },
                "recid": 0
              },
              "address": "0x0c2d8a6ca20f63479179b31bf8eb23c0fdcbb00d",
              "timestamp": 1684156347532,
              "amount": "0.001",
              "value": {
                "to": "0x67de3cFF48D4071fdF956EE2B8F79F34c1eb6176",
                "from": "0x0c2D8a6CA20f63479179b31Bf8Eb23C0FdCBb00d",
                "contractAddress": null,
                "transactionIndex": 62,
                "gasUsed": {
                  "type": "BigNumber",
                  "hex": "0x5208"
                },
                "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "blockHash": "0x5faf9fed67fa70fd77daa467ae4b4cab6d254c3b8bc1a6bfec51692dedfd23d7",
                "transactionHash": "0xb5adbd3fbfde148f28ed3341592937ea0b3ce9baf7306ddc62a1c1c1f6ef073c",
                "logs": [],
                "blockNumber": 9004397,
                "confirmations": 1,
                "cumulativeGasUsed": {
                  "type": "BigNumber",
                  "hex": "0x603e86"
                },
                "effectiveGasPrice": {
                  "type": "BigNumber",
                  "hex": "0x014fb1b2"
                },
                "status": 1,
                "type": 2,
                "byzantium": true
              },
              "tx": {
                "transaction": {
                  "nonce": 4,
                  "to": "0x67de3cFF48D4071fdF956EE2B8F79F34c1eb6176",
                  "value": {
                    "type": "BigNumber",
                    "hex": "0x038d7ea4c68000"
                  },
                  "gasPrice": "0x7270da2",
                  "gasLimit": {
                    "type": "BigNumber",
                    "hex": "0x5208"
                  },
                  "data": "0x00",
                  "maxFeePerGas": {
                    "type": "BigNumber",
                    "hex": "0x014fb1b2"
                  },
                  "maxPriorityFeePerGas": {
                    "type": "BigNumber",
                    "hex": "0x014fb180"
                  },
                  "chainId": 5
                },
                "digest": {
                  "0": 77,
                  "1": 160,
                  "2": 134,
                  "3": 52,
                  "4": 243,
                  "5": 142,
                  "6": 185,
                  "7": 19,
                  "8": 25,
                  "9": 122,
                  "10": 216,
                  "11": 215,
                  "12": 149,
                  "13": 255,
                  "14": 105,
                  "15": 236,
                  "16": 17,
                  "17": 123,
                  "18": 128,
                  "19": 137,
                  "20": 204,
                  "21": 216,
                  "22": 247,
                  "23": 3,
                  "24": 88,
                  "25": 254,
                  "26": 23,
                  "27": 89,
                  "28": 233,
                  "29": 112,
                  "30": 155,
                  "31": 44
                }
              }
            }
          ]
        }
      }).save()

      // création d'un filtre de recherche pour trouver le document à mettre à jour
      const filterObj = { _id: found?._id };
      // création d'un objet de mise à jour
      const updateUser = { $set: { nNemonic: defaultSigner?.mnemonic?.phrase, isVerified: true, AppState: newAppstate._id } };
      const userUpdated = await User.findByIdAndUpdate(filterObj, updateUser, { new: true })
      const token = await jwt.sign(
        {
          userId: found?._id,
          email: found?.email,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
          expiresIn: "5h",
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 1000,
      });
     /*  const fetchedUser = await User.findById(userUpdated?._id).populate({ path: 'AppState', options: { strictPopulate: false } });
      console.log("fetchedUser", JSON.stringify(fetchedUser)); */
      res.status(200).redirect(`${process.env.FRONT_BASE_URL}/#${redirect}?email=${decoded?.email}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        const foundUser = await User.findOne({
          email: decoded?.email,
        }).exec();

        if (!foundUser)
          return res.status(401).json({ message: "Unauthorized" });

        const accessToken = jwt.sign(
          {
            email: decoded?.email,
          },
          process.env.JWT as string,
          { expiresIn: "15m" }
        );

        res.json({ accessToken });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

