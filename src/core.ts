import { BigDecimal } from "@graphprotocol/graph-ts";
import { Event, Pair, Token } from "../generated/schema";
import { Burn, Mint, Swap, Sync } from "../generated/templates/Pair/Pair";
import { BURN_EVENT_TYPE, convertTokenToDecimal, MINT_EVENT_TYPE, SWAP_EVENT_TYPE } from "./helpers";

export function handleSync(event: Sync): void {
  let pair = Pair.load(event.address.toHex()) as Pair
  let token0 = Token.load(pair.token0) as Token
  let token1 = Token.load(pair.token1) as Token

  // sync event is emitted before mint, burn or swap
  // https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol
  pair.reserve0 = convertTokenToDecimal(event.params.reserve0, token0.decimals)
  pair.reserve1 = convertTokenToDecimal(event.params.reserve1, token1.decimals)
  pair.save()

  pair.save()
}

export function handleMint(event: Mint): void {
  let pair = Pair.load(event.address.toHex()) as Pair
  let token0 = Token.load(pair.token0) as Token
  let token1 = Token.load(pair.token1) as Token

  // update exchange info (except balances, sync will cover that)
  let token0Amount = convertTokenToDecimal(event.params.amount0, token0.decimals)
  let token1Amount = convertTokenToDecimal(event.params.amount1, token1.decimals)

  let mint = new Event(
    event.transaction.hash
      .toHexString()
      .concat('-')
      .concat(event.logIndex.toString())
  )
  mint.pair = pair.id
  mint.timestamp = event.block.timestamp
  mint.blocknumber = event.block.number
  mint.type = MINT_EVENT_TYPE
  // sync event is emitted before mint -> amount is already added to current reserve
  mint.reserve0_before = pair.reserve0.minus(token0Amount)
  mint.reserve0_after = pair.reserve0
  mint.reserve1_before = pair.reserve1.minus(token1Amount)
  mint.reserve1_after = pair.reserve1
  mint.deposit0 = token0Amount as BigDecimal
  mint.deposit1 = token1Amount as BigDecimal
  mint.save()
}

export function handleBurn(event: Burn): void {
  let pair = Pair.load(event.address.toHex()) as Pair
  let token0 = Token.load(pair.token0) as Token
  let token1 = Token.load(pair.token1) as Token

  let token0Amount = convertTokenToDecimal(event.params.amount0, token0.decimals)
  let token1Amount = convertTokenToDecimal(event.params.amount1, token1.decimals)

  let burn = new Event(
    event.transaction.hash
      .toHexString()
      .concat('-')
      .concat(event.logIndex.toString())
  )
  burn.pair = pair.id
  burn.timestamp = event.block.timestamp
  burn.blocknumber = event.block.number
  burn.type = BURN_EVENT_TYPE
  // sync event is emitted before burn -> amount is already subtracted from current reserve
  burn.reserve0_before = pair.reserve0.plus(token0Amount)
  burn.reserve0_after = pair.reserve0
  burn.reserve1_before = pair.reserve1.plus(token1Amount)
  burn.reserve1_after = pair.reserve1
  burn.withdraw0 = token0Amount as BigDecimal
  burn.withdraw1 = token1Amount as BigDecimal
  burn.save()
}

export function handleSwap(event: Swap): void {
  let pair = Pair.load(event.address.toHexString()) as Pair
  let token0 = Token.load(pair.token0) as Token
  let token1 = Token.load(pair.token1) as Token
  let amount0In = convertTokenToDecimal(event.params.amount0In, token0.decimals)
  let amount1In = convertTokenToDecimal(event.params.amount1In, token1.decimals)
  let amount0Out = convertTokenToDecimal(event.params.amount0Out, token0.decimals)
  let amount1Out = convertTokenToDecimal(event.params.amount1Out, token1.decimals)

  let swap = new Event(
    event.transaction.hash
      .toHexString()
      .concat('-')
      .concat(event.logIndex.toString())
  )
  swap.pair = pair.id
  swap.timestamp = event.block.timestamp
  swap.blocknumber = event.block.number
  swap.type = SWAP_EVENT_TYPE
  // sync event is emitted before swap -> current reserve already updated
  swap.reserve0_before = pair.reserve0.minus(amount0In).plus(amount0Out)
  swap.reserve0_after = pair.reserve0
  swap.reserve1_before = pair.reserve1.minus(amount1In).plus(amount1Out)
  swap.reserve1_after = pair.reserve1
  swap.swap0_in = amount0In as BigDecimal
  swap.swap1_in = amount1In as BigDecimal
  swap.swap0_out = amount0Out as BigDecimal
  swap.swap1_out = amount1Out as BigDecimal
  swap.save()
}