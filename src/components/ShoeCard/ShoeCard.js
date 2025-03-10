import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const flagText = {
    'on-sale': 'Sale',
    'new-release': 'Just released!'
  }[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant !== 'default' ? <Flag variant={variant}>{flagText}</Flag> : null}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price old={variant === 'on-sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  line-height: 0;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${p => p.old ? COLORS.gray[700] : 'inherit'};
  text-decoration: ${p => p.old ? 'line-through' : ''};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  right: -4px;
  top: 12px;
  padding: 6px 10px;
  border-radius: 2px;
  font-size: ${14 / 16}rem;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
  background-color: ${p => p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
`;

export default ShoeCard;
