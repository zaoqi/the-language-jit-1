const BiwaScheme = require('@zaoqi/biwascheme')
const TheLanguage = require('./lang.js')
BiwaScheme.define_libfunc('test-describe', 2, 2, (ar, intp)=>{
    BiwaScheme.assert_closure(ar[1])
    const name=BiwaScheme.to_write(ar[0])
    const body=BiwaScheme.js_closure(ar[1], intp)
    test(name,()=>{
        body()
    })
})
BiwaScheme.define_libfunc('test-check-equal?', 2, 2, (ar)=>{
    expect(BiwaScheme.equal(ar[0],ar[1])).toBe(true)
})
for(const [k, a, v] of [
    ['complex-parse', 1, TheLanguage.complex_parse],
    ['complex-print', 1, TheLanguage.complex_print],
    ['simple-print', 1, TheLanguage.simple_print],
    ['machinetext-parse', 1, TheLanguage.machinetext_parse],
    ['machinetext-print', 1, TheLanguage.machinetext_print],
    ['evaluate-with-environment', 2, TheLanguage.evaluate_with_environment],
    ['force-all-rec-ignore-comment', 1, TheLanguage.force_all_rec_ignore_comment],
]){
    BiwaScheme.define_libfunc(k, a, a, (ar)=>v.apply(null, ar))
}
for(const [k, v] of [
    ['null-v', TheLanguage.null_v],
    ['environment-null-v', TheLanguage.env_null_v],
]){
    BiwaScheme.TopEnv[k] = v
}
BiwaScheme.run_file('../test.scm')
