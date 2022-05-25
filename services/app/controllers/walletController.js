const { Transaction, Wallet, Category, sequelize } = require("../models");

const midtransClient = require("midtrans-client");
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-4wObHKAKYPH4vnvebuMZvXhy",
  clientKey: "SB-Mid-client-K8KdUXxazDEvITrJ",
});

class Controller {
  static async fetchWallet(req, res, next) {
    try {
      const id = +req.user.id;
      const wallet = await Wallet.findOne({
        where: {
          UserId: id,
        },
      });

      res.status(200).json({
        data: wallet,
      });
    } catch (err) {
      next(err);
    }
  }

  static async paymentGateway(req, res, next) {
    try {
      const { email } = req.body;
      let parameter = {
        transaction_details: {
          order_id:
            "M-Cure-" +
            Math.floor(Math.random() * 10000) +
            "PXw" +
            Math.floor(Math.random() * 1000) +
            "z" +
            Math.floor(Math.random() * 10),
          gross_amount: 300000,
        },
        customer_details: {
          email,
          phone: "+628127377777",
        },
        enabled_payments: [
          "credit_card",
          "cimb_clicks",
          "bca_klikbca",
          "bca_klikpay",
          "bri_epay",
          "echannel",
          "permata_va",
          "bca_va",
          "bni_va",
          "bri_va",
          "other_va",
          "gopay",
          "indomaret",
          "danamon_online",
          "akulaku",
          "shopeepay",
        ],
        credit_card: {
          secure: true,
          channel: "migs",
          bank: "bca",
          installment: {
            required: false,
            terms: {
              bni: [3, 6, 12],
              mandiri: [3, 6, 12],
              cimb: [3],
              bca: [3, 6, 12],
              offline: [6, 12],
            },
          },
          whitelist_bins: ["48111111", "41111111"],
        },
      };

      const transaction = await snap.createTransaction(parameter);

      let transactionToken = transaction.token;

      let transactionRedirectUrl = transaction.redirect_url;

      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
