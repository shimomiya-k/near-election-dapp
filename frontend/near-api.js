// 以下のように書き換えてください
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import getConfig from "./near-config";
const BN = require("bn.js");

const nearConfig = getConfig(process.env.NODE_ENV || "development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: [
        "nft_metadata",
        "nft_tokens_for_kind",
        "nft_return_candidate_likes",
        "check_voter_has_been_added",
        "check_voter_has_voted",
        "if_election_closed",
      ],

      changeMethods: [
        "new_default_meta",
        "nft_mint",
        "nft_transfer",
        "nft_add_likes_to_candidate",
        "voter_voted",
        "close_election",
        "reopen_election",
      ],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  // reload page
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function new_default_meta() {
  await window.contract.new_default_meta({ owner_id: window.accountId });
}

export async function nft_mint(
  title,
  description,
  media,
  media_CID,
  candidate_name,
  candidate_manifest,
  token_kind,
  receiver_id
) {
  await window.contract.nft_mint(
    {
      metadata: {
        title: title,
        description: description,
        media: media,
        media_CID: media_CID,
        candidate_name: candidate_name,
        candidate_manifest: candidate_manifest,
        token_kind: token_kind,
      },
      receiver_id: receiver_id,
    },
    300000000000000, // attached GAS (optional)
    new BN("1000000000000000000000000")
  );
}

export async function nft_transfer(receiver_id, token_id) {
  await window.contract.nft_transfer(
    {
      receiver_id: receiver_id,
      token_id: token_id,
    },
    300000000000000, // attached GAS (optional)
    new BN("1") // deposit yoctoNEAR
  );
}

export async function nft_add_likes_to_candidate(token_id) {
  await window.contract.nft_add_likes_to_candidate({ token_id: token_id });
}

export async function nft_metadata() {
  let contract_metadata = await window.contract.nft_metadata();
  return contract_metadata;
}

export async function nft_tokens_for_kind(token_kind) {
  let tokens_list = await window.contract.nft_tokens_for_kind({
    token_kind: token_kind,
  });
  return tokens_list;
}

export async function nft_return_candidate_likes(token_id) {
  let num_of_likes = await window.contract.nft_return_candidate_likes({
    token_id: token_id,
  });

  return num_of_likes;
}

export async function check_voter_has_been_added(voter_id) {
  return await window.contract.check_voter_has_been_added({
    voter_id: voter_id,
  });
}

export async function check_voter_has_voted(voter_id) {
  return await window.contract.check_voter_has_voted({ voter_id: voter_id });
}

export async function voter_voted(voter_id) {
  return await window.contract.voter_voted({ voter_id: voter_id });
}

export async function if_election_closed() {
  return await window.contract.if_election_closed();
}

export async function close_election() {
  await window.contract.close_election();
}

export async function reopen_election() {
  await window.contract.reopen_election();
}
