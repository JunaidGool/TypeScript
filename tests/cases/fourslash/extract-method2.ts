/// <reference path='fourslash.ts' />

//// namespace NS {
////     class Q {
////         foo() {
////             console.log('100');
////             const m = 10, j = "hello", k = {x: "what"};
////             const q = /*start*/m + j + k/*end*/;
////         }
////     }
//// }
goTo.select('start', 'end')
edit.applyRefactor({
    refactorName: "Extract Method",
    actionName: "scope_2",
    actionDescription: "Extract to function in global scope",
});
verify.currentFileContentIs(
`namespace NS {
    class Q {
        foo() {
            console.log('100');
            const m = 10, j = "hello", k = {x: "what"};
            const q = newFunction(m, j, k);
        }
    }
}
function newFunction(m: number, j: string, k: { x: string; }) {
    return m + j + k;
}
`);
