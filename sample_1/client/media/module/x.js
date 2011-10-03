var agt=navigator.userAgent.toLowerCase();
if (agt.indexOf("mac") != -1)
	var a="\r"; 
else
	var a="\n";
	
var max=0;
function tlist() {
	max=tlist.arguments.length;
	for (i=0; i<max; i++)
		this[i]=tlist.arguments[i];
}
var tl = new tlist(
"   o"+a+
"  /|\\"+a+
" */ \\*        "+a,

"   o_"+a+
"  \<| *"+a+
"  *\>\\         "+a,

"  _o/*"+a+
" * |"+a+
"  / \\         "+a,

" *\o_"+a+
"  /  *"+a+
" \<\\           "+a,

"  _o/*"+a+
" * |"+a+
"  / \\         "+a,

" *\\c/*"+a+
"   )"+a+
"  / \>         "+a,

"     *"+a+
"  \\__/c"+a+
"   \> \\*       "+a,

"   __/"+a+
"    (o_*"+a+
"     \\*       "+a,

"      \\ /"+a+
"       |"+a+
"     */o\\*    "+a,

"       \\_"+a+
"       ("+a+
"     */o\\*    "+a,

"        \<_"+a+
"      __("+a+
"     * o|*    "+a,

"         /_"+a+
"      __("+a+
"     * o|*    "+a,

"         ___"+a+
"      *\/ \>"+a+
"       o|*    "+a,

"        *"+a+
"       o|_/"+a+
"      */  \\   "+a,

"        *"+a+
"      _o|_"+a+
"     *   \>\\   "+a,

"       _o/*"+a+
"      * |"+a+
"       / \\    "+a,

"      *\\o/*"+a+
"        |"+a+
"       / \\    "+a,

"      c/*"+a+
"      \<\\"+a+
"      */\\     "+a,

"      c__"+a+
"      \<\ *"+a+
"      */\\     "+a,

"      c__"+a+
"      /\ *"+a+
"     * /\>     "+a,

"      c/*"+a+
"     /(__"+a+
"    * /       "+a,

"    __o/*"+a+
"    * (__"+a+
"      \<       "+a,

"      __o_"+a+
"     * /  *"+a+
"      \<\\      "+a,

"     *_o_"+a+
"       | *"+a+
"      \< \\     "+a,

"     *_c_*"+a+
"       |"+a+
"       \>\\     "+a,

"     *_c_*"+a+
"       |__"+a+
"       \>      "+a,

"     *_c_*"+a+
"     __|__"+a+
"              "+a,

" "+a+
"     *_c_*"+a+
"     __)__    "+a,

" "+a+
"     *\\c/*"+a+
"     __)__    "+a

);
var x=0;
function tick() {
	$('cheerleader').set('text', " " + a + tl[x]);
	x++;
	if (x != max)
		setTimeout("tick()", 200);
	else
		x = 0;
}