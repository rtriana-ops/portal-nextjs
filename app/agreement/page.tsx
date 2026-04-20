'use client'

export default function AgreementPage() {
  const htmlContent = `
    <section class="container" style="width: 100%; max-width: 1020px; margin: 0 auto; padding: 0 15px;">
      <div style="margin-top: 45px">
        <div style="text-align: center;">
          <div style="margin-bottom: 45px;">
            <img width="250" style="max-width: 250px; height: auto; display: block; margin: 0 auto;" src=""/>
            <div style="font-weight: bold; font-size: 17px; text-decoration: underline; margin: 45px 0; color: #212121;" id="payment-rights">PAYMENT RIGHTS PURCHASE AND SALE AGREEMENT</div>
          </div>
        </div>
        <div style="color: #757575; line-height: 1.45;">This Purchase and Sale Agreement, along with Terms and Conditions (the "Terms and Conditions"), and Payment Authorization Agreement (the "Authorization Agreement") incorporated and referenced herein and collectively and together referred to hereinafter as the "Agreement" is made by and between Fundo, LLC (hereinafter, together collectively referred to as the "Fundo" or the "Buyer"), and the business identified below (hereinafter, together collectively referred to as the "Seller" or the "Merchant"). Fundo and Seller may each individually be referred to hereinafter as a "Party" and may collectively be referred to as the "Parties".</div>
        
        <table style="border-collapse: collapse; width: 100%; margin: 45px auto; max-width: 400px; border: 1px solid #000;">
          <tbody>
            <tr style="background-color: #dddddd;">
              <td style="border: 1px solid #000; padding: 10px;">
                <span style="font-weight: bold; color: #747474;">Seller/Merchant Name:</span>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 10px;">
                <span style="font-weight: bold; color: #747474;">Business:</span>
              </td>
            </tr>
            <tr style="background-color: #dddddd;">
              <td style="border: 1px solid #000; padding: 10px;">
                <span style="font-weight: bold; color: #747474;">Address:</span>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; padding: 10px;">
                <span style="font-weight: bold; color: #747474;">City:</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="text-align: center; font-weight: bold; margin: 45px 0; color: #212121;">OFFER TO SELL AND PURCHASE PAYMENT RIGHTS</div>
        
        <div style="color: #757575; line-height: 1.45; margin: 45px 0;">
          <div>
            <span style="font-weight: bold;">Sale of Future Receipts (THIS IS NOT A LOAN).</span> Fundo's Small Business Finance Product (the "Program") has associated costs and is provided to help you understand and evaluate the Program's cost. Seller is selling a portion of their Future Receipts to the Buyer at a discount, not borrowing money from the Buyer. There is no interest rate or set payment schedule and no time period during which the Purchased Amount must be collected by Buyer.
          </div>
        </div>

        <div style="text-align: center; font-weight: bold; margin: 45px 0; color: #212121;">Small Business Finance Product Associated Costs</div>

        <table style="border-collapse: collapse; width: 100%; margin: 45px auto; border: 1px solid #000;">
          <tbody>
            <tr>
              <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                <div style="margin: 6px 0;"><span style="font-weight: bold; color: #747474;">Purchased Price Amount</span></div>
              </td>
              <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                <div style="margin: 6px 0;"><span style="font-weight: bold; color: #747474;">Disbursed Amount</span></div>
              </td>
              <td style="border: 1px solid #000; padding: 10px; text-align: center;">
                <div style="margin: 6px 0;"><span style="font-weight: bold; color: #747474;">Future Receipts Sold</span></div>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="font-size: 17px; font-weight: bold; text-align: center; color: #212121;">*** PLEASE NOTE: IF SELLER CAN PAY THE FUTURE RECEIPTS SOLD SOONER THEN FUNDO WILL OFFER A DISCOUNT ***</div>

        <div style="margin: 45px 0; color: #757575; line-height: 1.45;">
          <span style="font-weight: bold;">Optional Prepayments.</span>
          <span>Seller may prepay the Future Receipts sold for a discounted amount to be determined by Fundo at such time when the prepayment is requested. There will be no penalty for any prepayment.</span>
        </div>

        <div style="margin: 45px 0; color: #757575; line-height: 1.45;">
          <span style="font-weight: bold;">Seller's Warranties.</span> The Seller hereby represents and warrants to the Buyer that during the term of this agreement Seller shall deposit all Future Receipts into the bank account pre-approved by Fundo (the "Account") and instruct Seller's Credit Card processor to deposit all Credit Card receipts into the Account.
        </div>

        <div style="margin: 45px 0; font-weight: bold; color: #757575;">Seller's payments shall be drafted Weekly until all the Future Receipts Sold have been collected.</div>

        <div style="margin: 45px 0; color: #757575; line-height: 1.45;">
          <span style="font-weight: bold;">Fundo Acknowledgement.</span> There is no interest rate or payment schedule and no period of time during which the Purchased Amount must be collected by Fundo. Seller going bankrupt or going out of business does not constitute a breach of this Agreement.
        </div>

        <div style="margin: 45px 0; color: #757575; line-height: 1.45;">
          <span style="font-weight: bold;">Seller's Right to Request a Reconciliation.</span> The Payment amount is intended to represent the Specified Percentage of Future Receipts Sold. Seller may request that Fundo reconcile Seller's actual receipts by either crediting or debiting the difference.
        </div>

        <div style="margin: 45px 0; color: #757575; line-height: 1.45;">
          <span style="font-weight: bold;">Acceptance.</span> In consideration of Fundo's payment for the Purchase Price of Future Receipts sold, this Agreement shall be deemed valid if Seller executed this agreement and Fundo Deposits the Disbursed Amount into an account designated by the Seller.
        </div>

        <div style="margin: 45px 0; color: #757575; line-height: 1.45;">
          <span style="font-weight: bold;">Seller's Representations.</span> The Seller hereby represents and warrants to the Buyer that the Seller is authorized to sign this Agreement and that the statements contained in this Agreement are correct and complete.
        </div>

        <div style="margin: 45px 0; color: #212121; line-height: 1.45; font-weight: bold;">ANY MISREPRESENTATION MADE BY SELLER OR OWNER IN CONNECTION WITH THIS AGREEMENT MAY CONSTITUTE A SEPARATE CAUSE OF ACTION FOR FRAUD, INTENTIONAL MISREPRESENTATION AND/OR UNJUST ENRICHMENT.</div>

        <table style="border-collapse: collapse; width: 100%; margin: 45px auto; border: 1px solid #000;">
          <tbody>
            <tr>
              <th scope="row" style="border: 1px solid #000; padding: 10px; text-align: left; font-weight: bold; width: 140px; color: #747474;">Seller/Merchant:</th>
              <td style="border: 1px solid #000; padding: 10px; color: #757575;"></td>
            </tr>
            <tr>
              <th scope="row" style="border: 1px solid #000; padding: 10px; text-align: left; font-weight: bold; width: 140px; color: #747474;">Signature:</th>
              <td style="border: 1px solid #000; padding: 10px; color: #757575; text-decoration: underline;"></td>
            </tr>
            <tr>
              <th scope="row" style="border: 1px solid #000; padding: 10px; text-align: left; font-weight: bold; width: 140px; color: #747474;">Date:</th>
              <td style="border: 1px solid #000; padding: 10px; color: #757575;"></td>
            </tr>
            <tr>
              <th scope="row" style="border: 1px solid #000; padding: 10px; text-align: left; font-weight: bold; width: 140px; color: #747474;">IP Address:</th>
              <td style="border: 1px solid #000; padding: 10px; color: #757575;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `

  return (
    <div dangerouslySetInnerHTML={{__html: htmlContent}} style={{fontFamily: 'Arial, Helvetica, sans-serif'}} />
  )
}
