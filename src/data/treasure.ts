import { z } from 'zod';

import { TTreasury } from '@/types/treasury';

const TREASURY_BONDS_URL =
  'https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json';

const TreasuryResponseSchema = z.object({
  responseStatus: z.number(),
  responseStatusText: z.string(),
  statusInfo: z.string(),
  response: z.object({
    BdTxTp: z.object({ cd: z.number() }),
    TrsrBondMkt: z.object({
      opngDtTm: z.string(),
      clsgDtTm: z.string(),
      qtnDtTm: z.string(),
      stsCd: z.number(),
      sts: z.string(),
    }),
    TrsrBdTradgList: z.array(
      z.union([
        z.object({
          TrsrBd: z.object({
            cd: z.number(),
            nm: z.string(),
            featrs: z.string(),
            mtrtyDt: z.string(),
            minInvstmtAmt: z.number(),
            untrInvstmtVal: z.number(),
            invstmtStbl: z.string(),
            semiAnulIntrstInd: z.boolean(),
            rcvgIncm: z.string(),
            anulInvstmtRate: z.number(),
            anulRedRate: z.number(),
            minRedQty: z.number(),
            untrRedVal: z.number(),
            minRedVal: z.number(),
            isinCd: z.string(),
            FinIndxs: z.object({ cd: z.number(), nm: z.string() }),
            wdwlDt: z.null(),
            convDt: z.null(),
            BusSegmt: z.null(),
            amortQuotQty: z.number(),
          }),
          TrsrBdType: z.object({
            cd: z.number(),
            nm: z.string(),
            ctdyRate: z.null(),
            grPr: z.null(),
          }),
          SelicCode: z.number(),
        }),
        z.object({
          TrsrBd: z.object({
            cd: z.number(),
            nm: z.string(),
            featrs: z.string(),
            mtrtyDt: z.string(),
            minInvstmtAmt: z.number(),
            untrInvstmtVal: z.number(),
            invstmtStbl: z.string(),
            semiAnulIntrstInd: z.boolean(),
            rcvgIncm: z.null(),
            anulInvstmtRate: z.number(),
            anulRedRate: z.number(),
            minRedQty: z.number(),
            untrRedVal: z.number(),
            minRedVal: z.number(),
            isinCd: z.string(),
            FinIndxs: z.object({ cd: z.number(), nm: z.string() }),
            wdwlDt: z.null(),
            convDt: z.null(),
            BusSegmt: z.null(),
            amortQuotQty: z.number(),
          }),
          TrsrBdType: z.object({
            cd: z.number(),
            nm: z.string(),
            ctdyRate: z.null(),
            grPr: z.null(),
          }),
          SelicCode: z.number(),
        }),
        z.object({
          TrsrBd: z.object({
            cd: z.number(),
            nm: z.string(),
            featrs: z.string(),
            mtrtyDt: z.string(),
            minInvstmtAmt: z.number(),
            untrInvstmtVal: z.number(),
            invstmtStbl: z.string(),
            semiAnulIntrstInd: z.boolean(),
            rcvgIncm: z.string(),
            anulInvstmtRate: z.number(),
            anulRedRate: z.number(),
            minRedQty: z.number(),
            untrRedVal: z.number(),
            minRedVal: z.number(),
            isinCd: z.string(),
            FinIndxs: z.object({ cd: z.number(), nm: z.string() }),
            wdwlDt: z.null(),
            convDt: z.string(),
            BusSegmt: z.object({ cd: z.number(), nm: z.string() }),
            amortQuotQty: z.number(),
          }),
          TrsrBdType: z.object({
            cd: z.number(),
            nm: z.string(),
            ctdyRate: z.null(),
            grPr: z.null(),
          }),
          SelicCode: z.number(),
        }),
        z.object({
          TrsrBd: z.object({
            cd: z.number(),
            nm: z.string(),
            featrs: z.string(),
            mtrtyDt: z.string(),
            minInvstmtAmt: z.number(),
            untrInvstmtVal: z.number(),
            invstmtStbl: z.null(),
            semiAnulIntrstInd: z.boolean(),
            rcvgIncm: z.null(),
            anulInvstmtRate: z.number(),
            anulRedRate: z.number(),
            minRedQty: z.number(),
            untrRedVal: z.number(),
            minRedVal: z.number(),
            isinCd: z.string(),
            FinIndxs: z.object({ cd: z.number(), nm: z.string() }),
            wdwlDt: z.null(),
            convDt: z.null(),
            BusSegmt: z.null(),
            amortQuotQty: z.number(),
          }),
          TrsrBdType: z.object({
            cd: z.number(),
            nm: z.string(),
            ctdyRate: z.null(),
            grPr: z.null(),
          }),
          SelicCode: z.number(),
        }),
      ])
    ),
    BizSts: z.object({ cd: z.null(), dtTm: z.string() }),
  }),
});

const ListSchema = TreasuryResponseSchema.shape.response.shape.TrsrBdTradgList;

export type TreasuryList = z.infer<typeof ListSchema>;

export const getBonds = async (): Promise<TTreasury[]> => {
  const res = await fetch(TREASURY_BONDS_URL);

  if (!res.ok) {
    throw new Error('Failed to fetch');
  }

  return TreasuryResponseSchema.parse(
    await res.json()
  ).response.TrsrBdTradgList.map((i) => ({
    name: i.TrsrBd.nm,
    description: i.TrsrBd.featrs,
    annualInvestmentRate: i.TrsrBd.anulInvstmtRate,
    unitPrice: i.TrsrBd.untrInvstmtVal,
    minimalInvestmentAmount: i.TrsrBd.minInvstmtAmt,
  }));
};
