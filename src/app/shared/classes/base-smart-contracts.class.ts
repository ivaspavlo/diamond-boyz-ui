import { Contract } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

export class BaseSmartContracts {
  protected marketContract: Contract;
  protected dbzContract: Contract;
  protected provider: Web3Provider;

  constructor() {
  }
}
