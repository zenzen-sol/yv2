import React, { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { action, toJS } from "mobx";

import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { BsGearFill, BsThreeDots } from "react-icons/bs";

import Page from "@comp/layout/Page";
import Container from "@comp/layout/Container";

import Link from "@comp/ui/Link";
import Button from "@comp/ui/Button";
import Connection from "@comp/ui/ChainConnection";
import VaultsTable from "@comp/ui/Vault/Table";
import Modal from "@comp/ui/Modal";

import YearnIcon from "@assets/yearn.svg";

import useUI from "@hooks/stores/useUI";

const Index = observer(function Index() {
  const { isOpen, children, close } = useUI((store) => store.ui.modal);

  const { activate, deactivate, active, account } = useWeb3React();
  const toggleConnection = useCallback(() => {
    if (active) {
      deactivate();
    } else {
      const injected = new InjectedConnector({ supportedChainIds: [1] });
      activate(injected);
    }
  }, [active, activate, deactivate]);

  return (
    <Page>
      <Container>
        <div className="flex items-center">
          <div className="flex-grow flex items-center  text-3xl">
            <YearnIcon className="w-8 h-8 mr-4" />
            <h1 className="hidden sm:block font-light">yearn.finance</h1>
            <h1 className="block sm:hidden font-light">yearn</h1>
          </div>
          <div className="hidden lg:flex flex-grow items-baseline space-x-8">
            <div className="w-24 text-center">
              <Link href="/" active>
                EARN
              </Link>
            </div>
            <div className="w-24 text-center">
              <Link href="/">BORROW</Link>
            </div>
            <div className="w-24 text-center">
              <Link href="/">INSURE</Link>
            </div>
            <div className="w-24 text-center">
              <Link href="/">CREDIT</Link>
            </div>
          </div>
          <div className="flex space-x-2">
            <Connection
              address={account}
              connected={active}
              onClick={toggleConnection}
            />
            <Button className="hidden md:block">
              <BsGearFill className="w-4 h-4" />
            </Button>
            <Button className="hidden md:block">
              <BsThreeDots className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Container>
      <Container>
        <div className="container lg:max-w-screen-lg mx-auto">
          <VaultsTable />
        </div>
      </Container>
      <Modal isOpen={isOpen} onDismiss={action(() => close())}>
        <div>{children}</div>
      </Modal>
    </Page>
  );
});

export default Index;
