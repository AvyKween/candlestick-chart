type OpenTime = number;
type OpenPrice  = string;
type HighPrice  = string;
type LowPrice  = string;
type ClosePrice  = string;
type Volume  = string;
type CloseTime = number;
type QuoteAssetVolume = string;
type NumberOfTrades = number;
type TakerBuyBaseAssetVolume = string;
type TakerBuyQuoteAssetVolume = string;


export type KLine = [
    OpenTime,
    OpenPrice,
    HighPrice,
    LowPrice,
    ClosePrice,
    Volume,
    CloseTime,
    QuoteAssetVolume,
    NumberOfTrades,
    TakerBuyBaseAssetVolume,
    TakerBuyQuoteAssetVolume,
    any
]