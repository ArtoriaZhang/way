import{_ as a,c as n,o as s,a2 as p}from"./chunks/framework.Ii5gFk8W.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/golang/grammar.md","filePath":"docs/golang/grammar.md"}'),e={name:"docs/golang/grammar.md"},l=p(`<h2 id="golang-programming-grammar" tabindex="-1">Golang programming grammar <a class="header-anchor" href="#golang-programming-grammar" aria-label="Permalink to &quot;Golang programming grammar&quot;">​</a></h2><h3 id="method-define" tabindex="-1">method define <a class="header-anchor" href="#method-define" aria-label="Permalink to &quot;method define&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import (</span></span>
<span class="line"><span>	&quot;fmt&quot;</span></span>
<span class="line"><span>	&quot;math&quot;</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Vertex struct {</span></span>
<span class="line"><span>	X, Y float64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (v Vertex) Abs() float64 {</span></span>
<span class="line"><span>	return math.Sqrt(v.X*v.X + v.Y*v.Y)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (v *Vertex) Scale(f float64) {</span></span>
<span class="line"><span>	v.X = v.X * f</span></span>
<span class="line"><span>	v.Y = v.Y * f</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	v := Vertex{3, 4}</span></span>
<span class="line"><span>	v.Scale(10)</span></span>
<span class="line"><span>	fmt.Println(v.Abs())</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,3),t=[l];function i(c,r,o,m,d,g){return s(),n("div",null,t)}const f=a(e,[["render",i]]);export{_ as __pageData,f as default};
