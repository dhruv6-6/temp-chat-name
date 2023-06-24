const importPublicKey = async (pemPublicKey) => {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pemPublicKey.substring(
        pemHeader.length,
        pemPublicKey.length - pemFooter.length
    );
    const pemBytes = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
    return crypto.subtle.importKey(
        "spki",
        pemBytes,
        { name: "RSA-OAEP", hash: { name: "SHA-256" } },
        false,
        ["encrypt"]
    );
};
const importPrivateKey = async (pemPrivateKey) => {
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pemPrivateKey.substring(
        pemHeader.length,
        pemPrivateKey.length - pemFooter.length
    );
    const pemBytes = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));
    return crypto.subtle.importKey(
        "pkcs8",
        pemBytes,
        { name: "RSA-OAEP", hash: { name: "SHA-256" } },
        false,
        ["decrypt"]
    );
};
function importSymKey(rawKey) {
    return window.crypto.subtle.importKey(
        "raw",
        rawKey,
        {
            name: "AES-GCM",
        },
        true,
        ["encrypt", "decrypt"]
    );
}

const generateRSAKeys = async () => {
    const keyPair = await crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 4096,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: "SHA-256" },
        },
        true,
        ["encrypt", "decrypt"]
    );

    const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey(
        "pkcs8",
        keyPair.privateKey
    );
    const pemPublicKey = await  convertBinaryToPEM(publicKey, "PUBLIC KEY");
    const pemPrivateKey = await  convertBinaryToPEM(privateKey, "PRIVATE KEY");
    return { privateKey: pemPrivateKey, publicKey: pemPublicKey };
};
const convertBinaryToPEM = async (binaryData, label) => {
    var base64Data;
    await  arrayBufferToBase64(binaryData).then((res)=>{
        base64Data = res;
    });
    const pemHeader = `-----BEGIN ${label}-----`;
    const pemFooter = `-----END ${label}-----`;
    const pemContent = `${pemHeader}\n${base64Data}\n${pemFooter}`;
    return pemContent;
};
const arrayBufferToBase64 = async (buffer) => {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(binary);
};
async function arrayBufferToCryptoKey(arrayBuffer) {
    const arrayBufferView = new Uint8Array(arrayBuffer);
    const cryptoKey = await crypto.subtle.importKey(
        "raw", // Format of the key data
        arrayBufferView, // ArrayBuffer or typed array
        { name: "AES-GCM" }, // Algorithm object or identifier
        false, // Whether the key is extractable
        ["encrypt", "decrypt"] // Key usages
    );

    return cryptoKey;
}
async function cryptoKeyToArrayBuffer(cryptoKey) {
    const exportedKey = await crypto.subtle.exportKey("raw", cryptoKey);
    const keyBuffer = new Uint8Array(exportedKey);
    return keyBuffer.buffer;
}
const base64ToArrayBuffer = (base64) => {
    const binary = atob(base64);
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        buffer[i] = binary.charCodeAt(i);
    }
    return buffer.buffer;
};
const deriveKeyFromPassword = async (password, salt) => {
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        passwordData,
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
    );
    const derivedKey = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations: 100000,
            hash: { name: "SHA-256" },
        },
        keyMaterial,
        256
    );

    return crypto.subtle.importKey(
        "raw",
        derivedKey,
        { name: "AES-GCM" },
        false,
        ["encrypt", "decrypt"]
    );
};
const encryptPrivateKey = async (privateKey, secretString) => {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const secretKey = await deriveKeyFromPassword(secretString, salt);

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv,
        },
        secretKey,
        new TextEncoder().encode(privateKey)
    );

    const saltBase64 = await arrayBufferToBase64(salt);
    const ivBase64 = await arrayBufferToBase64(iv);
    const encryptedDataBase64 = await arrayBufferToBase64(encryptedData);

    return `${saltBase64}.${ivBase64}.${encryptedDataBase64}`;
};

const decryptPrivateKey = async (encryptedPrivateKey, secretString) => {
    const [saltBase64, ivBase64, encryptedDataBase64] =
        encryptedPrivateKey.split(".");
    const salt = base64ToArrayBuffer(saltBase64);
    const iv = base64ToArrayBuffer(ivBase64);
    const encryptedData = base64ToArrayBuffer(encryptedDataBase64);
    const secretKey = await deriveKeyFromPassword(secretString, salt);
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv,
        },
        secretKey,
        encryptedData
    );

    return new TextDecoder().decode(decryptedData);
};

const encrypt = async (publicKey, plaintext, key) => {
    const importedPublicKey = await importPublicKey(publicKey);
    var encodedPlaintext;
    if (key === 1) {
        plaintext = await cryptoKeyToArrayBuffer(plaintext);
        encodedPlaintext = new Uint8Array(plaintext);
    } else {
        encodedPlaintext = new TextEncoder().encode(plaintext);
    }

    const encryptedData = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        importedPublicKey,
        encodedPlaintext
    );
    return await arrayBufferToBase64(encryptedData);
};

const decrypt = async (privateKey, encryptedData, key) => {
    const importedPrivateKey = await importPrivateKey(privateKey);
    var encodedEncryptedData = base64ToArrayBuffer(encryptedData);

    const decryptedData = await crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        importedPrivateKey,
        encodedEncryptedData
    );
    if (key == 0) {
        return new TextDecoder().decode(decryptedData);
    } else {
        return arrayBufferToCryptoKey(decryptedData);
    }
};
function generateSymKey() {
    return window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

async function encryptSym(data, key) {
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);

    return window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: window.crypto.getRandomValues(new Uint8Array(12)),
        },
        key,
        encodedData
    );
}

async function decryptSym(encryptedData, key) {
    const importedPublicKey = await importPublicKey(key);
    return window.crypto.subtle
        .decrypt(
            {
                name: "AES-GCM",
                iv: window.crypto.getRandomValues(new Uint8Array(12)),
            },
            importedPublicKey,
            encryptedData
        )
        .then((decryptedData) => {
            const decoder = new TextDecoder();
            const decodedData = decoder.decode(decryptedData);
            return decodedData;
        });
}

export {
    convertBinaryToPEM,
    arrayBufferToBase64,
    base64ToArrayBuffer,
    importPublicKey,
    importPrivateKey,
    generateRSAKeys,
    deriveKeyFromPassword,
    encryptPrivateKey,
    decryptPrivateKey,
    encrypt,
    decrypt,
    generateSymKey,
    encryptSym,
    decryptSym,
};
