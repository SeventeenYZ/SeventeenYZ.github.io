import{_ as e,c as i,o as r,a as p}from"./app.b1167376.js";const s="/assets/images-format-compare.c79bdc46.png",f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"光栅图和矢量图","slug":"光栅图和矢量图","link":"#光栅图和矢量图","children":[]},{"level":2,"title":"img标签的intrinsic size和rendered size","slug":"img标签的intrinsic-size和rendered-size","link":"#img标签的intrinsic-size和rendered-size","children":[]},{"level":2,"title":"各格式特点","slug":"各格式特点","link":"#各格式特点","children":[]},{"level":2,"title":"各格式用法","slug":"各格式用法","link":"#各格式用法","children":[]}],"relativePath":"Topic/image.md"}'),n={name:"Topic/image.md"},a=p('<h2 id="光栅图和矢量图" tabindex="-1">光栅图和矢量图 <a class="header-anchor" href="#光栅图和矢量图" aria-hidden="true">#</a></h2><p>图像格式有两大类：光栅图和矢量图</p><p>光栅图：也叫位图，图片是由一个个像素构成，放大会模糊，格式有<code>.jpg</code>、<code>png</code>、<code>gif</code>和<code>webp</code>等</p><p>矢量图：矢量图通过一系列计算指令来表示的，放大不会模糊，格式有<code>.svg</code></p><h2 id="img标签的intrinsic-size和rendered-size" tabindex="-1">img标签的intrinsic size和rendered size <a class="header-anchor" href="#img标签的intrinsic-size和rendered-size" aria-hidden="true">#</a></h2><p><code>intrinsic size</code>：图片原有的尺寸，宽高各是多少像素</p><p><code>rendered size</code>：图片渲染到屏幕上占的像素</p><p>如果是光栅格式的话，<code>rendered size</code>越接近<code>intrinisic size</code>时，图片越模糊，<code>rendered size</code>最大值是<code>intrinisic size</code>，达到最大值后再放大相当于直接拉伸，越来越不清晰</p><p>如果是矢量格式，<code>rendered size</code>可以超过<code>intrinisic size</code>，并且清晰度不会受影响</p><h2 id="各格式特点" tabindex="-1">各格式特点 <a class="header-anchor" href="#各格式特点" aria-hidden="true">#</a></h2><p>jpg：也叫jpeg，采用有损压缩，不支持透明背景</p><p>png，采用无损压缩，支持透明背景</p><p>gif：采用无损压缩，支持动画，仅支持8位颜色（jpg和png支持24位）</p><p>webp：支持无损压缩和有损压缩，文件体积小，支持透明背景，支持动画</p><p>svg：文件体积一般比光栅图小，放大不模糊，支持动画</p><p><img src="'+s+'" alt="图片加载失败"></p><h2 id="各格式用法" tabindex="-1">各格式用法 <a class="header-anchor" href="#各格式用法" aria-hidden="true">#</a></h2><p>相同质量下，webp会比jpg和png文件更小，所以能用webp优先用webp，而且webp支持后备(fallback)用png或jpg</p><p>gif一般不用于静态图片</p><p>在展示图片时，一般svg和webp哪个文件小用哪个，svg多是用在图标中</p><p>在上传图片时，由于SVG是一种标记语言，因此它们容易受到恶意软件注入，出于安全考虑一般不允许上传svg格式的图片</p><p>一般照片用jpg格式，普通插图和图标用png或svg格式</p><p>jpg拥有很高的压缩比，会损失一些图像质量，适合展示color-heavy（理解为色彩丰富）的图片，例如拍摄的照片或个人照片，不适用于low-heavy（色彩少的）的例如屏幕截图，或者打印照片，或者一些带有线条、曲线、文本等元素的图片</p><p>如果比较关注图像质量而不太关注颜色，可以用png，png即使压缩后也能保持很高的质量，屏幕截图使用png更好，有时照片也会用png格式，因为png在保持图像质量方面更容易预测（Sometimes, they’re used over JPEGs for photography, since PNGs are more predictable in retaining image quality.）</p><p>gif用于需要快速显示一段动画，例如简短教程的情况下，作为引入一个短视频的替代品，不适合静态图片</p><p>jpg使用有损压缩来保持较小的文件大小。jpg压缩不是全有或全无的设置。可以在 0%（重度压缩）到 100%（无压缩）之间选择合适的压缩率。通常，将图像压缩到 75-100% 之间可以保持图像的完整性和高质量，压缩到 75% 时图像只有原来的一半大。大多数社交网络将其图像压缩在 70-85% 范围内，例如，Facebook 会将您的图片压缩 85%。</p><p>参考资料：<a href="https://themeisle.com/blog/best-image-format/#gref" target="_blank" rel="noreferrer">https://themeisle.com/blog/best-image-format/#gref</a> 参考资料：<a href="https://wpmudev.com/blog/best-image-formats-png-vs-jpg-svg-gif-webp/" target="_blank" rel="noreferrer">https://wpmudev.com/blog/best-image-formats-png-vs-jpg-svg-gif-webp/</a></p>',27),t=[a];function d(c,o,g,l,h,m){return r(),i("div",null,t)}const b=e(n,[["render",d]]);export{f as __pageData,b as default};
