using DAL.Entity;
using DTO.Request;
using DTO.Respone;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Transactions;
using Util.Constant;

namespace DAL
{
    public class PaymentRepository : BaseRepository<IBaseRequest, IBaseResponse>
    {
        protected override IBaseResponse DoExcute(IBaseRequest input)
        {
            var paymentRequestDTO = (PaymentRequestDTO)input;
            var orderDetailRequestDTOs = paymentRequestDTO.OrderDetails;
            var baseResponse = new CommonResponse();
            var effectResult = 0;
            using (var transaction = new TransactionScope())
            {
                try
                {
                    foreach (var orderDetailRequestDTO in orderDetailRequestDTOs)
                    {
                        var orderDetail = new OrderDetail
                        {
                            PostId = orderDetailRequestDTO.PostId,
                            AccountId = paymentRequestDTO.AccountId,
                            MonthAmount = orderDetailRequestDTO.MonthAmount,
                            PriceTotal = orderDetailRequestDTO.PriceTotal
                        };
   
                        _dtContext.OrderDetail.Add(orderDetail);
                        effectResult+= _dtContext.SaveChanges();
                    }
                    transaction.Complete();
                }
                catch(Exception e)
                {
                    effectResult = 0;
                    transaction.Dispose();
                }
            }
            baseResponse.Data = effectResult;
            return baseResponse;
        }

        protected override void PostExcute(IBaseRequest input)
        {
            // do nothing
        }

        protected override void PreExcute(IBaseRequest input)
        {
            // do nothing
        }

        private int FindNewestOrderDetail()
        {
            var newestOrderDetail = (from od in _dtContext.OrderDetail
                                     orderby od.OrderDated
                                     select od.OrderDated).Take(1);
            return 1;
        }
    }
}
