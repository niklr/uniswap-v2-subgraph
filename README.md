# optify-uniswap-v2-subgraph

```
npm install -g @graphprotocol/graph-cli
graph init --product hosted-service --from-contract 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
graph auth --product hosted-service <ACCESS_TOKEN>
```

https://docs.uniswap.org/protocol/V2/reference/API/entities

https://docs.uniswap.org/protocol/V2/concepts/advanced-topics/fees

There is a 0.3% fee for swapping tokens. 

* timestamp
* blocknumber
* event type: 'mint', 'burn', 'swap'
* reserve0_before
* reserve0_after
* reserve1_before
* reserve1_after
* swap0_in
* swap0_out
* swap1_in
* swap1_out
* swap_fee_token
* swap_fee_pct (percentage)
* deposit0
* deposit1
* withdraw0
* withdraw1

```
{
  events(first: 5, orderBy: blocknumber, where: { type: Burn}) {
    id
    pair {
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
    timestamp
    blocknumber
    type
    reserve0_before
    reserve0_after
    reserve1_before
    reserve1_after
    deposit0
    deposit1
    withdraw0
    withdraw1
  }
}
```

https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v2

```
{
  swaps(first: 5) {
    id
    amount0In
    amount1In
    amount0Out
    amount1Out
    pair {
      token0Price
      token1Price
      token0 {
        symbol
      }
      token1 {
        symbol
      }
    }
  }
}
```

```
{
  "data": {
    "swaps": [
      {
        "amount0In": "117816",
        "amount0Out": "0",
        "amount1In": "0",
        "amount1Out": "0.250201023684112805",
        "id": "0x0000000605df365a8aac7506d995391b760f238366f1526f158912629d855051-0",
        "pair": {
          "token0": {
            "symbol": "LGCY"
          },
          "token0Price": "413079.4849089631537531962388866835",
          "token1": {
            "symbol": "WETH"
          },
          "token1Price": "0.00000242084159715747148340782786737139"
        }
      },
      {
        "amount0In": "0.015",
        "amount0Out": "0",
        "amount1In": "0",
        "amount1Out": "0.516678550006609427",
        "id": "0x0000014be80cf0233ac4fefc02bd9dee376e197ca98ed4af6e6f9fe2cd5b428c-0",
        "pair": {
          "token0": {
            "symbol": "WBTC"
          },
          "token0Price": "0.06477960185832108560795229350158764",
          "token1": {
            "symbol": "WETH"
          },
          "token1Price": "15.4369581058415805943228273516469"
        }
      },
      {
        "amount0In": "200000",
        "amount0Out": "0",
        "amount1In": "0",
        "amount1Out": "7.05076765470194897",
        "id": "0x0000022f3ec65cec795729c4e16d7f07581e02d1a6fc31ee39e59e36ad86c4b7-0",
        "pair": {
          "token0": {
            "symbol": "GLQ"
          },
          "token0Price": "135183.5652183252163293812823080029",
          "token1": {
            "symbol": "WETH"
          },
          "token1Price": "0.000007397348918745945167601378167701192"
        }
      },
      {
        "amount0In": "0",
        "amount0Out": "340",
        "amount1In": "0.548916142051273397",
        "amount1Out": "0",
        "id": "0x000002c42681f10a0e971f5ff4f4f427d00777d2258eb750b8dad4c15971a029-0",
        "pair": {
          "token0": {
            "symbol": "CTASK"
          },
          "token0Price": "5697.958519744493758909033911106692",
          "token1": {
            "symbol": "WETH"
          },
          "token1Price": "0.0001755014531142711296170035721088685"
        }
      },
      {
        "amount0In": "795.0004128",
        "amount0Out": "0",
        "amount1In": "0",
        "amount1Out": "3.133334806402845094",
        "id": "0x000003cd4d06ca0f2695fe4d3d69768bcbcdffc943e2efa2ce69a8a7d349cc6b-0",
        "pair": {
          "token0": {
            "symbol": "DEGO"
          },
          "token0Price": "445.6726795141194458548309391079507",
          "token1": {
            "symbol": "WETH"
          },
          "token1Price": "0.002243799196060701761598800742457151"
        }
      }
    ]
  }
}
```