import{_ as a,c as n,o as s,a2 as p}from"./chunks/framework.CCoplHXX.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"docs/golang/grammar.md","filePath":"docs/golang/grammar.md"}'),e={name:"docs/golang/grammar.md"},l=p(`<h2 id="golang-programming-grammar" tabindex="-1">Golang programming grammar <a class="header-anchor" href="#golang-programming-grammar" aria-label="Permalink to &quot;Golang programming grammar&quot;">​</a></h2><h3 id="method-define" tabindex="-1">method define <a class="header-anchor" href="#method-define" aria-label="Permalink to &quot;method define&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
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
<span class="line"><span>}</span></span></code></pre></div><h2 id="automatically-interprets" tabindex="-1">Automatically interprets <a class="header-anchor" href="#automatically-interprets" aria-label="Permalink to &quot;Automatically interprets&quot;">​</a></h2><p>Comparing the previous two programs, you might notice that functions with a pointer argument must take a pointer:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var v Vertex</span></span>
<span class="line"><span>ScaleFunc(v, 5)  // Compile error!</span></span>
<span class="line"><span>ScaleFunc(&amp;v, 5) // OK</span></span></code></pre></div><p>while methods with pointer receivers take either a value or a pointer as the receiver when they are called:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>var v Vertex</span></span>
<span class="line"><span>v.Scale(5)  // OK</span></span>
<span class="line"><span>p := &amp;v</span></span>
<span class="line"><span>p.Scale(10) // OK</span></span></code></pre></div><p>For the statement v.Scale(5), even though v is a value and not a pointer, the method with the pointer receiver is called automatically. That is, as a convenience, Go interprets the statement v.Scale(5) as (&amp;v).Scale(5) since the Scale method has a pointer receiver.</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>package main</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import &quot;fmt&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>type Vertex struct {</span></span>
<span class="line"><span>	X, Y float64</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func (v *Vertex) Scale(f float64) {</span></span>
<span class="line"><span>	v.X = v.X * f</span></span>
<span class="line"><span>	v.Y = v.Y * f</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func ScaleFunc(v *Vertex, f float64) {</span></span>
<span class="line"><span>	v.X = v.X * f</span></span>
<span class="line"><span>	v.Y = v.Y * f</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>func main() {</span></span>
<span class="line"><span>	v := Vertex{3, 4}</span></span>
<span class="line"><span>	v.Scale(2)</span></span>
<span class="line"><span>	ScaleFunc(&amp;v, 10)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	p := &amp;Vertex{4, 3}</span></span>
<span class="line"><span>	p.Scale(3)</span></span>
<span class="line"><span>	ScaleFunc(p, 8)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	fmt.Println(v, p)</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,10),t=[l];function i(c,r,o,m,h,d){return s(),n("div",null,t)}const g=a(e,[["render",i]]);export{u as __pageData,g as default};
