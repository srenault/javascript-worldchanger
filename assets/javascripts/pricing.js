$(function(){

    function getQuestions(ctx, callback) {
        ctx.api.form("questions")
            .query('[[:d = at(document.tags, ["pricing"])]]')
            .orderings("[my.faq.priority desc]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    function getplans(ctx, callback) {
        ctx.api.form("plans")
            .orderings("[my.pricing.price]")
            .ref(ctx.ref)
            .submit(function (err, docs) {
                callback(err, docs.results);
            });
    }

    Common.getCtx().then(function(ctx) {

        Common.getBookmark('pricing', ctx).then(function(pricing) {
            getplans(ctx, function(err, plans) {
                getQuestions(ctx, function(err1, questions) {

                    var data = {
                        pricing: pricing,
                        plans: plans,
                        questions: questions,
                        ctx: ctx,
                        page: 'pricing'
                    };

                    Common.insertTmpl('#pricing', data);
                    Common.insertTmplFromFile('#faqaccordion', data, 'layout/faqaccordion.tpl');
                    Common.insertTmplFromFile('#menu', data, 'layout/menu.tpl');
                    Common.insertTmplFromFile('#footer', data, 'layout/footer.tpl');
                });
            });
        });
    });
});