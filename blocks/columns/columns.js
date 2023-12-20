import { buildBlock, loadBlock } from "../../scripts/lib-franklin.js";

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  if (block.closest('.about-us')) {
    // Build social-links blocks
    const socialLinks = block.querySelectorAll('div div p:last-child');
    socialLinks.forEach((socialLink) => {
      const allSocialLinks = socialLink.querySelectorAll('a');
      const paramArr = [];
      allSocialLinks.forEach(link => {
        link.classList.add('button');
        paramArr.push(link.outerHTML);
      }); 
      
      const socialLinksBlock = buildBlock('social-links', paramArr.join(''));
      socialLink.innerHTML = socialLinksBlock.outerHTML;
      socialLink.dataset.blockName = 'social-links';
      loadBlock(socialLink);
    });

    // Build bio-card blocks
    const allContents = block.children[0].children;
    [... allContents].forEach((content) => {
      const paramArr = [];
      paramArr.push(`<div>${content.querySelector('picture').outerHTML}</div>`);
      paramArr.push(`<div>${content.querySelector('p:nth-child(2)').innerHTML}</div>`);
      paramArr.push(`<div>${content.querySelector('p:nth-child(3)').innerHTML}</div>`);
      const bioCard = buildBlock('bio-card', paramArr.join(''));
      bioCard.querySelector('div>div>div').classList.add('bio-card');
      bioCard.dataset.blockName = 'bio-card';
      const socialLinks = content.querySelector('.social-links');
      content.innerHTML = bioCard.outerHTML;
      content.appendChild(socialLinks);
      loadBlock(content.querySelector('.bio-card'));
    });
  }
}
